import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from 'src/typeorm/entities/chat';
import { CreateMessageDto, MessageDto } from 'src/dto/chat.dto';
import { Channel, User } from 'src/typeorm';

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

  async findOne(id: number) {
    const message =  await this.messagesRepository.findOne(id, {
      relations: ['author', 'channel']
    });
    if (!message) {
      throw new NotFoundException(`Message [${id}] not found`);
    }
    return message;
  }

  async getByChan(id: number, elements: number): Promise<Chat[]> {
    const messages = await this.messagesRepository.find({
      relations: ['channel'],
      where: {
        channel : {id: id}
      }
    })
    return messages;
  }

  async create(messageDto: CreateMessageDto) {
    const message = new Chat();
    message.content = messageDto.content;
    let channel = new Channel();
    channel.id = messageDto.channelId;
    message.channel = channel;
    let author = new User();
    author.id = messageDto.authorId;
    message.author = author;
    message.service = messageDto.service
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

  async remove(id: number) {
    const message = await this.findOne(id);
    if (!message) {
      throw new NotFoundException(`Message [${id}] not found`);
    }
    return this.messagesRepository.remove(message);
  }
}
