import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from 'src/typeorm/entities/chat';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private messagesRepository: Repository<Chat>,
    private readonly authenticationService: AuthService
  ) {}
}
