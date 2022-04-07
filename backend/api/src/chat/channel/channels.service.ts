import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from 'src/typeorm';
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

  
  async create(channelDto: ChannelDto) {
    const chan = await this.channelsRepository.findOne({
      where: {
        name: channelDto.name
      }
    });
    if (!chan && channelDto.name.length > 2) {
    channelDto.owner = await this.usersService.getOne(channelDto.owner.id);
    const channel = this.channelsRepository.create(channelDto);
    return this.channelsRepository.save(channel);
    }
    else
      console.error("channel name invalide or already taken");
      
  }

  async update(id: string, updateChannelDto: ChannelDto) { 
    const channel = await this.channelsRepository.preload({
      id: +id,
      ...updateChannelDto,
    });
    if (!channel) {
      throw new NotFoundException(`Cannot update Channel [${id}]: Not found`);
    }
    return this.channelsRepository.save(channel);
  }

  async remove(userID: number ,id: string) {
    const channel = await this.findOne(id);
    if (!channel) {
      throw new NotFoundException(`Channel [${id}] not found`);
    }
    if (channel.admin.some((admin) => {return admin.id == userID})) {
      throw new NotFoundException(`User not found in the admin data`);
    }
    return this.channelsRepository.remove(channel);
  }
}
