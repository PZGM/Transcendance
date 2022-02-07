import { Injectable, Inject, CACHE_MANAGER, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatResponseDTO, ChatsResponseDTO, CreateChatDTO } from 'src/dto/chat.dto';
import { User, Chat } from 'src/typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { AppGateway } from '../app.gateway';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat) private chatRepository: Repository<Chat>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @Inject(CACHE_MANAGER) private cacheManager,
        private gateway: AppGateway,
    ) {}

    private async checkIfUsersExist(from: string, to: string): Promise<void> {
        if (!await this.userRepository.findOne({ where: { email: to }})) {
            throw new HttpException('Receiver of the chat doesn\'t exist in the system', HttpStatus.BAD_REQUEST);
        }
        if (! await this.userRepository.findOne({ where: { email: from }})) {
            throw new HttpException('Sender of the chat doesn\'t exist in the system', HttpStatus.BAD_REQUEST);
        }
    }

    private async getRecipientToken(email: string): Promise<boolean> {
        return this.cacheManager.get(email);
    }

    async createChat(data: CreateChatDTO): Promise<ChatResponseDTO> {
        const { to, from } = data;
        await this.checkIfUsersExist(from, to);
        const chat = this.chatRepository.create(data);
        const token = await this.getRecipientToken(to);
        const chatResponseObject = chat.toResponseObject();
        if (token) {
            await this.gateway.wss.emit(token, chatResponseObject);
        }
        chat.delivered = true;
        chat.seen = false;
        await this.chatRepository.save(chat);
        return chatResponseObject;
    }

    async getConversation(convoWith, user, options: IPaginationOptions): Promise<ChatsResponseDTO> {
        options.page = 1;
        const queryBuilder = this.chatRepository.createQueryBuilder('chat');
        if (convoWith !== user) {
            queryBuilder
                .where('chat.from = :from and chat.to = :to or chat.from = :to and chat.to = :from', { from: user, to: convoWith })
                .orderBy('chat.createdDate', 'DESC');
        } else {
            queryBuilder
                .where('chat.from = :from and chat.to = :to', { from: user, to: convoWith })
                .orderBy('chat.createdDate', 'DESC');
        }
        const chats = await paginate<Chat>(queryBuilder, options);
        const unseenCount = await this.chatRepository.count({
            from: convoWith,
            to: user,
            seen: false,
        });
        let seenCount = 0;
        if (chats.items) {
            for (const chat of chats.items) {
                if (!chat.seen) {
                    ++seenCount;
                    chat.seen = true;
                    this.chatRepository.save(chat);
                }
            }
        }
        const chatsResponse = new ChatsResponseDTO();
            chatsResponse.items = chats.items;
            chatsResponse.itemCount =  chats.meta.itemCount;
            chatsResponse.pageCount = chats.meta.totalPages;
            chatsResponse.unseenItems = unseenCount - seenCount;
        
            return chatsResponse;
    }
}