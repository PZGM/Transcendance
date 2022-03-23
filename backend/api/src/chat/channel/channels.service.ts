import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from 'src/typeorm/entities/channel';
import { CreateChannelDto } from 'src/dto/chat.dto';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelsRepository: Repository<Channel>,
  ) {}

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

  create(createChannelDto: CreateChannelDto) {
    const channel = this.channelsRepository.create(createChannelDto);
    return this.channelsRepository.save(channel);
  }

  async update(id: string, updateChannelDto: CreateChannelDto) { 
    const channel = await this.channelsRepository.preload({
      id: +id,
      ...updateChannelDto,
    });
    if (!channel) {
      throw new NotFoundException(`Cannot update Channel [${id}]: Not found`);
    }
    return this.channelsRepository.save(channel);
  }

  async remove(id: string) { 
    const channel = await this.findOne(id);
    if (!channel) {
      throw new NotFoundException(`Channel [${id}] not found`);
    }
    return this.channelsRepository.remove(channel);
  }
}
