import { Body, Controller, Delete, Get, Patch, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { FullyAuthentificatedGuard } from 'src/auth/controllers/auth/guards';
import { ChannelsService } from './channels.service';
import { CustomRequest } from 'src/utils/types';
import { CreateChannelDto, RelationsPicker } from 'src/dto/chat.dto';
import { ChannelDto } from 'src/dto/chat.dto';
import { ApiTags } from '@nestjs/swagger';

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

  @Get('allNames')
  @UseGuards(FullyAuthentificatedGuard)
  public async getChannelsName(@Req() request: CustomRequest): Promise<string[]> {
    const channelsNames: string[] = await this.channelsService.getChannelsNames(request.user.id);
    return channelsNames;
  }

  @Get('/name/:name')
  @UseGuards(FullyAuthentificatedGuard)
  public async getChannelByName(@Req() request: CustomRequest, @Param('name') name: string) {
    return this.channelsService.getOneByName(name);
  }

  @Get(':id')
  @UseGuards(FullyAuthentificatedGuard)
  findOne(@Param('id') id: number, option?: RelationsPicker) {
    return this.channelsService.getOne(id, option);
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

  @Put('update/addAdmin')
  @UseGuards(FullyAuthentificatedGuard)
  public async addBlockedUser(@Req() request: CustomRequest, @Body() admin: {id: number}, channelID: number) {
      const ret =  await this.channelsService.addAdmin(request.user.id, admin.id, channelID);
  }

  @Put('join')
  @UseGuards(FullyAuthentificatedGuard)
  public async join(@Req() request: CustomRequest,@Body()  join:{channelId: number}) {
      console.log('body:');
      console.log(join);
      console.log('user id :')
      console.log(request.user.id);
      return await this.channelsService.join(request.user.id, join.channelId);
  }

  @Put('update/rmUser')
  @UseGuards(FullyAuthentificatedGuard)
  public async removeUser(@Req() request: CustomRequest, @Body() rmUser: {id: number}, channelID: number) {
      const ret =  await this.channelsService.removeUser(request.user.id, rmUser.id, channelID);
  }

  @Put('/update/removeAdmin')
  @UseGuards(FullyAuthentificatedGuard)
  public async removeBlockedUser(@Req() request: CustomRequest,@Body() admin: {id: number}, channelID: number) {
      const ret =  await this.channelsService.removeAdmin(request.user.id, admin.id, channelID);
  }

  @Delete(':id')
  @UseGuards(FullyAuthentificatedGuard)
  delete(@Req() request: CustomRequest, @Param('id') id: number) {
    return this.channelsService.delete(request.user.id, id);
  }
}
