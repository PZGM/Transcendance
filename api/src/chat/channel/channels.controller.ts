import { Body, Controller, Delete, Get, Patch, Param, Post, Put, Req, UseGuards, Query } from '@nestjs/common';
import { FullyAuthentificatedGuard } from 'src/auth/controllers/auth/guards';
import { ChannelsService } from './channels.service';
import { CustomRequest } from 'src/utils/types';
import { CreateChannelDto, RelationsPicker } from 'src/dto/chat.dto';
import { ChannelDto } from 'src/dto/chat.dto';
import { ApiTags } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

@ApiTags('Channel')
@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}
	private logger = new Logger("ChannelsController")

  @Get()
  @UseGuards(FullyAuthentificatedGuard)
  public async getChannels(@Req() request: CustomRequest) {
    let channels: ChannelDto[] = await this.channelsService.getChannels(request.user.id);
    return channels;
  }

  @Put('/join/:id')
  @UseGuards(FullyAuthentificatedGuard)
  public async joinChannel(@Req() request: CustomRequest, @Param('id') id: string): Promise<boolean>{
        const chanId:number = parseInt(id, 10);
    return await this.channelsService.join(request.user.id, chanId)
  }

  @Get('allNames')
  @UseGuards(FullyAuthentificatedGuard)
  public async getChannelsName(@Req() request: CustomRequest): Promise<string[]> {
        let channelsNames: string[] = await this.channelsService.getChannelsNames(request.user.id);
    return channelsNames;
  }

  @Get('/name/:name')
  @UseGuards(FullyAuthentificatedGuard)
  public async getChannelByName(@Req() request: CustomRequest, @Param('name') name: string, @Query() query?) {
        const options: RelationsPicker = {
      withAdmin: query?.withAdmin === 'true',
      withChat: query?.withChat === 'true',
      withMuted: query?.withMuted === 'true',
      withOwner: query?.withOwner === 'true',
      withBanned: query.withBanned === 'true',
    }
    const channel = await this.channelsService.getOneByName(name, options);
    if (channel && !channel.users.some((user) => {return user.id == request.user.id })) {
      channel.chats = [];
      channel.admin = [];
      channel.users = [];
      channel.chats = [];
      channel.ban = [];
      channel.owner = null;
    }
    if (channel)
      return new ChannelDto(channel);
    return null;
  }

  @Get(':id')
  @UseGuards(FullyAuthentificatedGuard)
  async findOne(@Req() request: CustomRequest, @Param('id') id: number, @Query() query?) {
        //this.logger.log("findOne : :id");
        const options: RelationsPicker = {
      withAdmin: query?.withAdmin === 'true',
      withChat: query?.withChat === 'true',
      withMuted: query?.withMuted === 'true',
      withOwner: query?.withOwner === 'true',
      withBanned: query.withBanned === 'true',
    }
    const channel = await this.channelsService.getOne(id, options);
    if (channel && !channel.users.some((user) => {return user.id == request.user.id })) {
      channel.chats = [];
      channel.admin = [];
      channel.users = [];
      channel.chats = [];
      channel.owner = null;
      channel.ban = [];
    }    return new ChannelDto(channel);
  }

  @Post()
  @UseGuards(FullyAuthentificatedGuard)
  async create(@Body() createChannelDto: CreateChannelDto): Promise<boolean> {
        const chan = await this.channelsService.create(createChannelDto);
        if (!chan) {
          return false;
  }
        return true;
  }

  @Patch(':id')
  @UseGuards(FullyAuthentificatedGuard)
  update(@Param('id') id: number, @Body() updateChannelDto: ChannelDto) {
        return this.channelsService.update(id, updateChannelDto);
  }

  @Put('join')
  @UseGuards(FullyAuthentificatedGuard)
  public async join(@Req() request: CustomRequest,@Body()  join:{channelId: number, password?: string}) {
      if (join.password)
        return await this.channelsService.join(request.user.id, join.channelId, join.password);
      return await this.channelsService.join(request.user.id, join.channelId);
  }

  @Put('leave')
  @UseGuards(FullyAuthentificatedGuard)
  public async leave(@Req() request: CustomRequest,@Body()  leave:{channelId: number}) {
        return await this.channelsService.removeUser(request.user.id, request.user.id, leave.channelId);
  }

  @Put('update/rmUser')
  @UseGuards(FullyAuthentificatedGuard)
  public async removeUser(@Req() request: CustomRequest, @Body() rmUser: {id: number}, channelID: number) {
      const ret =  await this.channelsService.removeUser(request.user.id, rmUser.id, channelID);
  }

  @Put('promote')
  @UseGuards(FullyAuthentificatedGuard)
  public async promoteAdmin(@Req() request: CustomRequest, @Body() promoteDto: {adminId: number, channelId: number}): Promise<boolean> {
      try {
      await this.channelsService.promote(request.user.id, promoteDto.adminId, promoteDto.channelId);
      return true;
    }
    catch (e) {
      return false;
    }
  }

  @Put('demote')
  @UseGuards(FullyAuthentificatedGuard)
  public async demoteAdmin(@Req() request: CustomRequest,@Body() demoteDto: {adminId: number, channelId: number}) {
      try {
      await this.channelsService.demote(request.user.id, demoteDto.adminId, demoteDto.channelId);
      return true;
    }
    catch(e) {
      return false;
    }
  }

  @Put('invite')
  @UseGuards(FullyAuthentificatedGuard)
  public async invite(@Req() request: CustomRequest, @Body() inviteDto: {invitedId: number, channelId: number}): Promise<boolean> {
      return await this.channelsService.addUser(request.user.id, inviteDto.channelId, inviteDto.invitedId);
  }

  @Delete(':id')
  @UseGuards(FullyAuthentificatedGuard)
  delete(@Req() request: CustomRequest, @Param('id') id: number) {
      return this.channelsService.delete(request.user.id, id);
  }

  @Put('/mp_channel/:id')
  @UseGuards(FullyAuthentificatedGuard)
  public async createOrJoinPrivateMessage(@Req() request: CustomRequest, @Param('id') id: string): Promise<number>{
      const friendId: number = parseInt(id, 10);
    const userId: number = request.user.id;
    return await this.channelsService.createOrJoinPrivateMessage(userId, friendId);
  }
}
