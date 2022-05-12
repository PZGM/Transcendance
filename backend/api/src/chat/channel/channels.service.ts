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
          relations.push('owner');
          relations.push('chats');
          relations.push('mute');
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
    console.log(`owner id : ${createChannelDto.ownerId}`)
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
  
  public async join(userID: number, chanID: number, password?: string) {
    const chan: Channel | null = await this.getOne(chanID);
    if (!chan) {
      throw new NotFoundException(`Channel [${chanID}] not found`);
      return false;
    }
    if (chan.visibility === "protected") {
      const decipher = createDecipheriv(process.env.ALGO, process.env.KEY, process.env.IV)
      const decryptedPassword = Buffer.concat([decipher.update(Buffer.from(chan.password)), decipher.final(),]);
      if(decryptedPassword.toString() !== password) {
        throw new NotFoundException(`Incorrect password`);
        return false;
      }
    }
    if (!(chan.users.some((user: User) => {return user.id == userID}))) {
    chan.users.push(await this.usersService.getOne(userID));
    }
    this.chatGateway.handleJoinChannel();
    this.channelsRepository.save(chan);
    return true;
}

  public async removeUser(userID: number, rmID : number, chanID: number) {
    const chan: Channel | null = await this.getOne(chanID);
    if (rmID === chan.owner.id) {
      if (userID !== chan.owner.id)
        throw new NotFoundException(`No No No`);
      this.removeAdmin(userID, rmID, chanID);
      if (chan.admin[0])
        chan.owner = chan.admin[0];
      else {
        this.delete(chan.owner.id, chanID)
        return 0
      }
    }
    if (chan.admin.some((admin: User) => {return admin.id == rmID})) {
      if (userID !== chan.owner.id && userID !== rmID)
        throw new NotFoundException(`Only the owner of the channel can remove an admin. An admin can remove himself`);
      this.removeAdmin(userID, rmID, chanID);
    }
    else if (!chan.admin.some((admin: User) => {return admin.id == userID}) && userID != rmID) {
      throw new NotFoundException(`Only an admin or the User itself can remove the user`);
    }
    if (!chan) {
      throw new NotFoundException(`Channel [${chanID}] not found`);
    }
    chan.users = chan.users.filter((user: User) => {
      return user.id != rmID;
    })
    return this.channelsRepository.save(chan);
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
    const channel = await this.getOne(id);
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
