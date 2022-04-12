import { Body, Controller, Delete, Get, Patch, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { FullyAuthentificatedGuard } from 'src/auth/controllers/auth/guards';
import { ChannelsService } from './channels.service';
import { CustomRequest } from 'src/utils/types';
import { RelationsPicker } from 'src/dto/chat.dto';
import { ChannelDto } from 'src/dto/chat.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Channel')
@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Get()
  @UseGuards(FullyAuthentificatedGuard)
  public async getChannels() {
    let channels: ChannelDto[] = await this.getChannels();
    return channels;
  }

  @Get(':id')
  @UseGuards(FullyAuthentificatedGuard)
  findOne(@Param('id') id: number, option?: RelationsPicker) {
    return this.channelsService.getOne(id, option);
  }

  @Post()
  @UseGuards(FullyAuthentificatedGuard)
  create(@Body() ChannelDto: ChannelDto) {
    return this.channelsService.create(ChannelDto);
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

    @Put('/update/removeAdmin')
    @UseGuards(FullyAuthentificatedGuard)
    public async removeBlockedUser(@Req() request: CustomRequest,@Body() admin: {id: number}, channelID: number) {
        const ret =  await this.channelsService.removeAdmin(request.user.id, admin.id, channelID);
    }

  @Delete(':id')
  @UseGuards(FullyAuthentificatedGuard)
  remove(@Req() request: CustomRequest, @Param('id') id: number) {
    return this.channelsService.remove(request.user.id, id);
  }
}
