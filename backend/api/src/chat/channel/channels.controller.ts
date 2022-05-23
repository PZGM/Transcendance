import { Body, Controller, Delete, Get, Patch, Param, Post, Put, Req, UseGuards, Query } from '@nestjs/common';
import { FullyAuthentificatedGuard } from 'src/auth/controllers/auth/guards';
import { ChannelsService } from './channels.service';
import { CustomRequest } from 'src/utils/types';
import { CreateChannelDto, RelationsPicker } from 'src/dto/chat.dto';
import { ChannelDto } from 'src/dto/chat.dto';
import { ApiTags } from '@nestjs/swagger';
import passport from 'passport';
import { QueryResult } from 'typeorm';
import { userInfo } from 'os';

@ApiTags('Channel')
@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

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
    const channelsNames: string[] = await this.channelsService.getChannelsNames(request.user.id);
    return channelsNames;
  }

  @Get('/name/:name')
  @UseGuards(FullyAuthentificatedGuard)
  public async getChannelByName(@Req() request: CustomRequest, @Param('name') name: string, @Query() query) {
    const options: RelationsPicker = {
      withAdmin: query.withAdmin === 'true',
      withChat: query.withChat === 'true',
      withMuted: query.withMuted === 'true',
      withOwner: query.withOwner === 'true',
    }
    const channel = await this.channelsService.getOneByName(name, options);
    if (channel && !channel.users.some((user) => {return user.id == request.user.id })) {
      channel.chats = [];
      channel.admin = [];
      channel.users = [];
      channel.chats = [];
      channel.owner = null;
    }
    if (channel)
      return new ChannelDto(channel);
    return null;
  }

  @Get(':id')
  @UseGuards(FullyAuthentificatedGuard)
  async findOne(@Param('id') id: number) {
    const channel = await this.channelsService.getOne(id);
    return new ChannelDto(channel);
  }

  @Post()
  @UseGuards(FullyAuthentificatedGuard)
  create(@Body() createChannelDto: CreateChannelDto) {
    return this.channelsService.create(createChannelDto);
  }

  @Patch(':id')
  @UseGuards(FullyAuthentificatedGuard)
  update(@Param('id') id: number, @Body() updateChannelDto: ChannelDto) {
    return this.channelsService.update(id, updateChannelDto);
  }


  @Put('update/addMute')
    @UseGuards(FullyAuthentificatedGuard)
    public async addMute(@Req() request: CustomRequest, @Body() mute: {id: number}, channelID: number, date: Date) {
        const ret =  await this.channelsService.addMute(request.user.id, channelID, mute.id, date);
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

  @Delete(':id')
  @UseGuards(FullyAuthentificatedGuard)
  delete(@Req() request: CustomRequest, @Param('id') id: number) {
    return this.channelsService.delete(request.user.id, id);
  }
}
