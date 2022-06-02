import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel, Mute } from 'src/typeorm';
import { User } from 'src/typeorm';
import { ChannelDto, CreateChannelDto, RelationsPicker } from 'src/dto/chat.dto';
import { UsersService } from 'src/users/users.service';
import { createCipheriv } from 'crypto';
import { ChatGateway } from '../chat.gateway';
import { Ban } from 'src/typeorm/entities/BannedUser';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelsRepository: Repository<Channel>, private readonly usersService: UsersService, private readonly chatGateway: ChatGateway
  ) {}

  public async getChannelsNames(userId: number): Promise<string[]|null> {
    let channels  = await this.channelsRepository
    .createQueryBuilder().select()
    .getMany()
    const ret: string[] = channels.map((channel) => {
      return channel.name;
    });
    return ret;
  }

  public async getChannels(userId: number): Promise<ChannelDto[]|null> {
    let channels  = await this.channelsRepository
    .createQueryBuilder().select()
    .getMany()
    const ret: ChannelDto[] = channels.map((channel) => {
      return new ChannelDto(channel);
    });
    return ret;
  }

  public findAll() {
    return this.channelsRepository.find({
      relations: ['owner']
    });
  }

  public async getOne(channelId: number, relationsPicker?:RelationsPicker): Promise<Channel|null> {
    try {
        let relations: string[] = [];
        if (relationsPicker) {
            relationsPicker.withOwner && relations.push('owner');
            relationsPicker.withChat && relations.push('chats');
            relationsPicker.withMuted && relations.push('mute');
            relationsPicker.withAdmin && relations.push('admin');
            relationsPicker.withBanned && relations.push('ban');

        }
        const chan: Channel = await this.channelsRepository.findOneOrFail({
            relations,
            where: {
                id: channelId
            }
        });
        return chan;
    }
    catch (e) {
        console.log(e)
        return null;
    }
}


public async getOneByName(channelName: string, relationsPicker?: RelationsPicker): Promise<Channel|null> {
  try {
      let relations: string[] = [];
      if (relationsPicker) {
        relationsPicker.withOwner && relations.push('owner');
        relationsPicker.withChat && relations.push('chats');
        relationsPicker.withMuted && relations.push('mute');
        relationsPicker.withAdmin && relations.push('admin');
      }
      const chan: Channel = await this.channelsRepository.findOne({
          relations,
          where: {
              name: channelName
          }
      });
      return chan;
  }
  catch (e) {
      console.log(e)
      throw new NotFoundException(`Channel name not found`);
  }
}

  
  public async create(createChannelDto: CreateChannelDto) {
    if (await this.channelsRepository.count({
      where: {
        name: createChannelDto.name
      }
    }) != 0 || createChannelDto.name.length < 3 || createChannelDto.name.length > 10)
      throw new NotFoundException(`Channel name invalide or already taken`);
    
    
    let channel: Channel = new Channel();
    const owner: User|null = (createChannelDto.ownerId != -1) ? await this.usersService.getOne(createChannelDto.ownerId) : null;
    channel.name = createChannelDto.name;
    channel.visibility = createChannelDto.visibility;
    channel.owner = owner;
    channel.admin = [owner];
    channel.users = [owner];
    channel.mute = [];
    channel.ban = [];
    channel.chats = [];

    if (channel.visibility == "protected"){
      const cipher = createCipheriv(process.env.ALGO, process.env.KEY, process.env.IV)
      const encryptedPassword = Buffer.concat([cipher.update(createChannelDto.password), cipher.final(),]);
      channel.password = encryptedPassword.toString();
    }
    let ret = await this.channelsRepository.save(channel);
    if (createChannelDto.ownerId !== -1)
      this.chatGateway.broadcastJoinChannel(ret.id, createChannelDto.ownerId);
    return ret;
  }

  public async promote(userId: number, adminId : number, chanId: number) {
    console.log(`promote admin ${userId} ${adminId} ${chanId}`)
    const chan: Channel | null = await this.getOne(chanId, {withAdmin: true, withOwner: true, withMuted: true});
    if (!chan) {
      throw new NotFoundException(`Channel [${chanId}] not found`);
    }
    if (!chan.owner || chan.owner.id !== userId) {
      if (chan.owner)
        console.log(chan.owner.id);
      else
        console.log()
      throw new NotFoundException(`Only the owner can promote admin`);
    }
    if ((chan.admin.some((admin) => {return admin.id == adminId}))) {
      throw new NotFoundException(`This user is already admin in this chan`);
    }
    chan.admin.push(await this.usersService.getOne(adminId));
    chan.mute = chan.mute.filter((mute) => mute.user.id != adminId); //remove any mute on the user
    await this.channelsRepository.save(chan);
    this.chatGateway.broadcastPromoteAdmin(chanId, adminId);
    return;
}

  public async demote(userId: number, adminId : number, chanId: number) {
    const chan: Channel | null = await this.getOne(chanId, {withAdmin: true, withOwner: true});
    if (!chan) {
      throw new NotFoundException(`Channel [${chanId}] not found`);
    }
    if (!chan.owner || chan.owner.id !== userId) {
      throw new NotFoundException(`Only the owner can demote admin`);
    }
    if (!(chan.admin.some((admin) => {return admin.id == adminId}))) {
      throw new NotFoundException(`This user isn't admin in this chan`);
    }
    chan.admin = chan.admin.filter((admin: User) => {
      return admin.id != adminId;
    })
    this.chatGateway.broadcastDemoteAdmin(chanId, adminId);
    return this.channelsRepository.save(chan);
  }
  
  public async join(userId: number, chanId: number, password?: string) {
    const chan: Channel | null = await this.getOne(chanId, {withBanned: true});
    if (!chan || chan.visibility === 'private') {
      return false;
    }
    if (chan.visibility === "protected") {
      const cipher = createCipheriv(process.env.ALGO, process.env.KEY, process.env.IV)
      const encryptedPassword = Buffer.concat([cipher.update(password), cipher.final()]);
      if(encryptedPassword.toString() !== chan.password) {
         return false;
      }
    }
    if ((chan.users.some((user: User) => {return user.id == userId}))) {
      return false;
    }
    if (chan.ban.some((ban) => {return ban.user.id == userId && ban.endOfBan.valueOf() - Date.now() > 0}))
      return false;
    chan.users.push(await this.usersService.getOne(userId));
    this.channelsRepository.save(chan);
    this.chatGateway.broadcastJoinChannel(chanId, userId);
    return true;
}

  public async removeUser(userId: number, rmId : number, chanId: number) {
    const channel: Channel | null = await this.getOne(chanId, {withOwner: true, withAdmin: true});

    if (chanId === 1)
      return;

    const isAdmin = channel.admin.some((adm) => { return adm.id == userId});
    const isOwner = channel.owner.id == userId;
    const selfLeave = userId === rmId;
    const removeAdmin = channel.admin.some((adm) => { return adm.id == rmId});

    if (selfLeave || isOwner || (isAdmin && !removeAdmin))
    {
      console.log('users before:');
      console.log(channel.users);
      channel.users = channel.users.filter((user) => { return user.id !== rmId});
      console.log('users after:');
      console.log(channel.users);
      await this.chatGateway.broadcastLeaveChannel(chanId, rmId);
      if (isAdmin) {
        channel.admin = channel.admin.filter((user) => { return user.id !== rmId});
        if (isOwner) {
          if (channel.admin.length > 0){
            channel.owner = channel.admin[0];
            await this.chatGateway.broadcastNewOwner(chanId, channel.admin[0].id);
          }
          else if (channel.users.length > 0) {
            channel.admin = [channel.users[0]]
            channel.owner = channel.users[0];
            await this.chatGateway.broadcastNewOwner(chanId, channel.users[0].id);
          }
          else {
            this.delete(userId, chanId);
            console.log('channel deleted');
            return;
          }
        }
      }
      this.channelsRepository.save(channel);
    }
  }


  public async addUser(userId: number, chanId: number, addId: number) {
    const channel: Channel | null = await this.getOne(chanId, {withAdmin: true});
    if (!channel ||!channel.admin.some((admin) => {return admin.id == userId}))
      return false;
    if (channel.users.some((user) => {return user.id == addId}))
      return false;
    channel.users.push(await this.usersService.getOne(addId));
    this.channelsRepository.save(channel);
    this.chatGateway.broadcastJoinChannel(chanId, addId);
    return true;
}

  public async update(id: number, ChannelDto: ChannelDto) { 
    const channel = await this.channelsRepository.preload({
      id: +id,
      ...ChannelDto,
    });
    if (!channel) {
      throw new NotFoundException(`Cannot update Channel [${id}]: Not found`);
    }
    return this.channelsRepository.save(channel);
  }

  public async delete(userId: number ,id: number) {
    const channel = await this.getOne(id, {withOwner: true});
    if (!channel) {
      throw new NotFoundException(`Channel [${id}] not found`);
    }
    if (userId !== channel.owner.id ) {
      throw new NotFoundException(`Just the owner can delete the Channel`);
    }
    return this.channelsRepository.remove(channel);
  }

  public async createOrJoinPrivateMessage(userId: number, friendId: number): Promise<number> {
    const chanName = (friendId < userId) ? `*${friendId}*${userId}*` : `*${userId}*${friendId}*`;
    let channel = await this.getOneByName(chanName);
    if (channel == null)
    {
      channel = await this.create({name: chanName, visibility: 'private', ownerId: -1});
      if (!channel) 
        return -1;
      let user = new User();
      user.id = userId;
      let friend = new User();
      friend.id = friendId;
      channel.users = [user, friend];
      await this.channelsRepository.save(channel);
    }
    return channel.id;
  }
}
