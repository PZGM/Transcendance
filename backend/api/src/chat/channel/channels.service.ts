import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from 'src/typeorm';
import { User } from 'src/typeorm';
import { ChannelDto } from 'src/dto/chat.dto';
import { UsersService } from 'src/users/users.service';
import { CustomRequest } from 'src/utils/types';

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

  findAll() {
    return this.channelsRepository.find({
      relations: ['owner']
    });
  }

  async findOne(id: string) {
    const channel =  await this.channelsRepository.findOne(id, {
      relations: ['owner']
    });
    if (!channel) {
      throw new NotFoundException(`Channel [${id}] not found`);
    }
    return channel;
  }

  
  public async create(channelDto: ChannelDto) {
    const chan : Channel | null = await this.channelsRepository.findOne({
      where: {
        name: channelDto.name
      }
    });
    if (!chan && channelDto.name.length > 2) {
    channelDto.owner = await this.usersService.getOne(channelDto.owner.id);
    const channel = this.channelsRepository.create(channelDto);
    chan.admin.push(channelDto.owner);
    return this.channelsRepository.save(channel);
    }
    else
    throw new NotFoundException(`Channel name invalide or already taken`);
      
  }

  public async addAdmin(userID: number, adminID : number, chanID: string) {
    const chan: Channel | null = await this.findOne(chanID);
    if (!chan.admin.some((admin) => {return admin.id == userID})) {
      throw new NotFoundException(`User not found in the admin data`);
    }
    if (!chan) {
      throw new NotFoundException(`Channel [${chanID}] not found`);
    }
    if (!(chan.admin.some((admin) => {return admin.id == adminID}))) {
    chan.admin.push(await this.usersService.getOne(adminID));
    }
    return this.channelsRepository.save(chan);
}

public async removeAdmin(userID: number, adminID : number, chanID: string) {
  const chan: Channel | null = await this.findOne(chanID);
  if (!chan.admin.some((admin) => {return admin.id == userID})) {
    throw new NotFoundException(`User not found in the admin data`);
  }
  if (!chan) {
    throw new NotFoundException(`Channel [${chanID}] not found`);
  }
  chan.admin = chan.admin.filter((admin: User) => {
    return admin.id != adminID;
  })
  return this.channelsRepository.save(chan);
}
  

  public async update(id: string, updateChannelDto: ChannelDto) { 
    const channel = await this.channelsRepository.preload({
      id: +id,
      ...updateChannelDto,
    });
    if (!channel) {
      throw new NotFoundException(`Cannot update Channel [${id}]: Not found`);
    }
    return this.channelsRepository.save(channel);
  }

  public async remove(userID: number ,id: string) {
    const channel = await this.findOne(id);
    if (!channel) {
      throw new NotFoundException(`Channel [${id}] not found`);
    }
    if (userID !== channel.owner ) {
      throw new NotFoundException(`Just the owner can delete the Channel`);
    }
    return this.channelsRepository.remove(channel);
  }

  public async addMute(userID: number ,id: string, muteID: number) { ////old remove to modify
    const channel: Channel | null = await this.findOne(id);
   if (!channel) {
      throw new NotFoundException(`Channel [${id}] not found`);
    }
    if (!channel.admin.some((admin) => {return admin.id == userID})) {
      throw new NotFoundException(`User not found in the admin data`);
    }
    if (!channel.mute.some((mute: User) => {return  mute.id == muteID})) {
      channel.mute.push(await this.usersService.getOne(muteID));
    }
    return this.channelsRepository.save(channel);
  }
}