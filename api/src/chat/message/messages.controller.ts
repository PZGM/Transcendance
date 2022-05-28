import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageDto } from 'src/dto/chat.dto';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { CustomRequest } from 'src/utils/types';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService, private readonly userService: UsersService) {}

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Get('/channel/:id')
  async getMessagesByChannel(@Param('id') id: number, @Req() request: CustomRequest) {
    if (! await this.userService.userIsInChannel(request.user.id, id))
      return [];
    let messages = await this.messagesService.getByChan(id, 50);
    return messages.map((message) => {
      let ret = new MessageDto(message);
      ret.channelId = id;
      return ret;
    });
  }

  @Post()
  create(@Body() messageDto: MessageDto) {
    return this.messagesService.create(messageDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: MessageDto) {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
}
