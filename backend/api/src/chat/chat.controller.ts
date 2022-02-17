import { Controller, Post, Body, UsePipes, ValidationPipe, UseGuards, Get, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { AuthentificatedGuard } from 'src/auth/controllers/auth/guards';
import { ChatService } from 'src/chat/chat.service';
import { ChatResponseDTO, ChatsResponseDTO, CreateChatDTO } from 'src/dto/chat.dto';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
    constructor(private ChatService: ChatService) {}

    @Post('msg')
    @UseGuards(AuthentificatedGuard)
    @UsePipes(new ValidationPipe())
    async createChat(@Body() data: CreateChatDTO): Promise<ChatResponseDTO> {
        return this.ChatService.createChat(data);
    }

    @Get('/conversation')
    @UseGuards(AuthentificatedGuard)
    async index(@Query('with') convoWith: string, @Query('page') page: number = 0,
                @Query('limit') limit: number = 10,
                @Req() req: Request) {
        limit = limit > 100 ? 100 : limit;
        return await this.ChatService.getConversation(convoWith, req.body.from, { page, limit });
    }
}