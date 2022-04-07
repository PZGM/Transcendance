import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from 'src/typeorm/entities/chat';
import { MessageDto } from 'src/dto/chat.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Chat)
    private readonly messagesRepository: Repository<Chat>,
  ) {}

  findAll() {
    return this.messagesRepository.find({
      relations: ['author', 'channel']
    });
  }

  async findOne(id: string) {
    const message =  await this.messagesRepository.findOne(id, {
      relations: ['author', 'channel']
    });
    if (!message) {
      throw new NotFoundException(`Message [${id}] not found`);
    }
    return message;
  }

  create(MessageDto: MessageDto) {
    const message = this.messagesRepository.create(MessageDto);
    return this.messagesRepository.save(message);
  }

  async update(id: string, updateMessageDto: MessageDto) { 
    const message = await this.messagesRepository.preload({
      id: +id,
      ...updateMessageDto,
    });
    if (!message) {
      throw new NotFoundException(`Cannot update Message [${id}]: Not found`);
    }
    return this.messagesRepository.save(message);
  }

  async remove(id: string) { 
    const message = await this.findOne(id);
    if (!message) {
      throw new NotFoundException(`Message [${id}] not found`);
    }
    return this.messagesRepository.remove(message);
  }
}
