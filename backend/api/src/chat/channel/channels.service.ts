import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel, Mute } from 'src/typeorm';
import { User } from 'src/typeorm';
import { ChannelDto, CreateChannelDto, MutedUserDto, RelationsPicker } from 'src/dto/chat.dto';
import { UsersService } from 'src/users/users.service';
import { createDecipheriv, createCipheriv } from 'crypto';
import { UserDto } from 'src/dto/user.dto';
import { ChatGateway } from '../chat.gateway';

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
    channel.chats = [];

    if (channel.visibility == "protected"){
      const cipher = createCipheriv(process.env.ALGO, process.env.KEY, process.env.IV)
      const encryptedPassword = Buffer.concat([cipher.update(createChannelDto.password), cipher.final(),]);
      channel.password = encryptedPassword.toString();
    }
    let ret = await this.channelsRepository.save(channel);
    if (createChannelDto.ownerId !== -1)
      this.chatGateway.handleJoinChannel(ret.id, createChannelDto.ownerId);
    return ret;
  }

  public async addAdmin(userID: number, adminID : number, chanID: number) {
    const chan: Channel | null = await this.getOne(chanID);
    if (chan.owner.id !== userID) {
      throw new NotFoundException(`Just the owner can demote admin`);
    }
    /*if (!chan.admin.some((admin) => {return admin.id == userID})) {
      throw new NotFoundException(`User not found in the admin data`);
    }*/
    if (!chan) {
      throw new NotFoundException(`Channel [${chanID}] not found`);
    }
    if (!(chan.admin.some((admin) => {return admin.id == adminID}))) {
    chan.admin.push(await this.usersService.getOne(adminID));
    }
    return this.channelsRepository.save(chan);
}

  public async removeAdmin(userID: number, adminID : number, chanID: number) {
    const chan: Channel | null = await this.getOne(chanID);
    if (chan.owner.id !== userID) {
      throw new NotFoundException(`Just the owner can demote admin`);
    }
    /*if (!chan.admin.some((admin) => {return admin.id == userID})) {
      throw new NotFoundException(`User not found in the admin data`);
    }
    */
    if (!chan) {
      throw new NotFoundException(`Channel [${chanID}] not found`);
    }
    chan.admin = chan.admin.filter((admin: User) => {
      return admin.id != adminID;
    })
    return this.channelsRepository.save(chan);
  }
  
  public async join(userId: number, chanId: number, password?: string) {
    const chan: Channel | null = await this.getOne(chanId);
    if (!chan) {
      return false;
    }
    if (chan.visibility === "protected") {
      const cipher = createCipheriv(process.env.ALGO, process.env.KEY, process.env.IV)
      const encryptedPassword = Buffer.concat([cipher.update(password), cipher.final()]);
      if(encryptedPassword.toString() !== chan.password) {
         return false;
      }
    }
    if (!(chan.users.some((user: User) => {return user.id == userId}))) {
    chan.users.push(await this.usersService.getOne(userId));
    }
    this.channelsRepository.save(chan);
    this.chatGateway.handleJoinChannel(chanId, userId);
    return true;
}

  public async removeUser(userID: number, rmID : number, chanID: number) {
    const channel: Channel | null = await this.getOne(chanID, {withOwner: true, withAdmin: true});

    if (chanID === 1)
      return;

    const isAdmin = channel.admin.some((adm) => { return adm.id === userID});
    const isOwner = channel.owner.id === userID;
    const selfLeave = userID === rmID;
    const removeAdmin = channel.admin.some((adm) => { return adm.id === rmID});

    if (selfLeave || isOwner || (isAdmin && !removeAdmin))
    {
      channel.users = channel.users.filter((user) => { return user.id !== rmID});
      this.chatGateway.handleleaveChannel(chanID, rmID);
      if (isAdmin) {
        channel.admin = channel.admin.filter((user) => { return user.id !== rmID});
        if (isOwner) {
          if (channel.admin.length > 0)
            channel.owner = channel.admin[0];
          else if (channel.users.length > 0)
            channel.owner = channel.users[0];
          else
            this.delete(userID, chanID);
        }
      }
      this.channelsRepository.save(channel);
    }
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

  public async delete(userID: number ,id: number) {
    const channel = await this.getOne(id, {withOwner: true});
    if (!channel) {
      throw new NotFoundException(`Channel [${id}] not found`);
    }
    if (userID !== channel.owner.id ) {
      throw new NotFoundException(`Just the owner can delete the Channel`);
    }
    return this.channelsRepository.remove(channel);
  }

  public async addMute(userID: number ,id: number, muteID: number, date : Date) {
    const channel: Channel | null = await this.getOne(id);
   if (!channel) {
      throw new NotFoundException(`Channel [${id}] not found`);
    }
    if (!channel.admin.some((admin) => {return admin.id == userID})) {
      throw new NotFoundException(`User not found in the admin data`);
    }
    if (!channel.mute.some((mute: Mute) => {return  mute.user.id == muteID})) {
      try {
        let muted : Mute = new Mute();
        muted.endOfMute = date;
        muted.muter = await this.usersService.getOne(userID);
        muted.user = await this.usersService.getOne(muteID);
        channel.mute.push(muted);
      }
      catch (e) {
        console.log(e)
        return null;
      }
      return this.channelsRepository.save(channel);
    }
  }
}
