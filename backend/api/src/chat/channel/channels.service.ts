import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from 'src/typeorm';
import { User } from 'src/typeorm';
import { ChannelDto, MuteUser, RelationsPicker } from 'src/dto/chat.dto';
import { UsersService } from 'src/users/users.service';
import { createDecipheriv, createCipheriv } from 'crypto';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelsRepository: Repository<Channel>, private readonly usersService: UsersService
  ) {}

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
            relationsPicker.withChat && relations.push('chat')
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

  
  public async create(channelDto: ChannelDto) {
    const chan : Channel | null = await this.channelsRepository.findOne({
      where: {
        name: channelDto.name
      }
    });
    if (channelDto.visibility !== "public"){
      const cipher = createCipheriv(process.env.ALGO, process.env.KEY, process.env.IV)
      const encryptedPassword = Buffer.concat([cipher.update(chan.password), cipher.final(),]);
      channelDto.password = encryptedPassword.toString();
    }
    if (!chan && channelDto.name.length > 2) {
    channelDto.owner = await this.usersService.getOne(channelDto.owner.id);
    const channel = this.channelsRepository.create(channelDto);
    chan.admin.push(channelDto.owner);
    return this.channelsRepository.save(channel);
    }
    else
    throw new NotFoundException(`Channel name invalide or already taken`);
      
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
    }
    if (chan.visibility !== "public") {
      const decipher = createDecipheriv(process.env.ALGO, process.env.KEY, process.env.IV)
      const decryptedPassword = Buffer.concat([decipher.update(Buffer.from(chan.password)), decipher.final(),]);
      if(decryptedPassword.toString() !== password) {
        throw new NotFoundException(`Incorrect password`);
      }
    }
    if (!(chan.users.some((user: User) => {return user.id == userID}))) {
    chan.users.push(await this.usersService.getOne(userID));
    }
    return this.channelsRepository.save(chan);
}

  public async removeUser(userID: number, rmID : number, chanID: number) {
    const chan: Channel | null = await this.getOne(chanID);
    if (!chan.admin.some((admin: User) => {return admin.id == userID}) && userID != rmID) {
      throw new NotFoundException(`Just an admin or the User itself can remove him`);
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
    if (!channel.mute.some((mute: MuteUser) => {return  mute.user.id == muteID})) {
      try {
        let muted : MuteUser = new MuteUser();
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