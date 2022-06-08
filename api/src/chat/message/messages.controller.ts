import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, ParseIntPipe } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageDto } from 'src/dto/chat.dto';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { CustomRequest } from 'src/utils/types';
import { Logger } from '@nestjs/common';
import { FullyAuthentificatedGuard } from 'src/auth/controllers/auth/guards';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}
	private logger = new Logger("MessagesController")

  @Get()
    @UseGuards(FullyAuthentificatedGuard)
    findAll() {
    this.logger.log("findAll : ");
    return this.messagesService.findAll();
  }

  @Get(':id')
    @UseGuards(FullyAuthentificatedGuard)
    findOne(@Param('id') id: number) {
        //this.logger.log("findOne : :id");
        return this.messagesService.findOne(id);
  }

  @Get('/channel/:id')
    @UseGuards(FullyAuthentificatedGuard)
    async getMessagesByChannel(@Param('id') id: number, @Req() request: CustomRequest) {
    this.logger.log("getMessagesByChannel : /channel/:id");
//     if (! await this.userService.userIsInChannel(request.user.id, id))
//       return [];
    let messages = await this.messagesService.getByChan(id, 50);
    return messages.map((message) => {
      let ret = new MessageDto(message);
      ret.channelId = id;
      return ret;
    });
  }

  @Post()
    @UseGuards(FullyAuthentificatedGuard)
    create(@Body() messageDto: MessageDto) {
        this.logger.log("create : ");
        return this.messagesService.create(messageDto);
  }

  @Patch(':id')
    @UseGuards(FullyAuthentificatedGuard)
    update(@Param('id') id: string, @Body() updateMessageDto: MessageDto) {
        this.logger.log("update : :id");
        return this.messagesService.update(id, updateMessageDto);
  }

  // ParseIntPipe is necessary to receive a number
  @Delete(':id')
    @UseGuards(FullyAuthentificatedGuard)
    remove(@Param('id', ParseIntPipe) id: number) {
        this.logger.log("remove : :id");
        return this.messagesService.remove(id);
  }
}
