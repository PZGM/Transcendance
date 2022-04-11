import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from 'src/dto/chat.dto';
import { ApiTags } from '@nestjs/swagger';
import { FullyAuthentificatedGuard } from 'src/auth/controllers/auth/guards';

@ApiTags('Channel')
@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Get()
  findAll() {
    return this.channelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.channelsService.findOne(id);
  }

  @Post()
  create(@Body() createChannelDto: CreateChannelDto) {
    return this.channelsService.create(createChannelDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChannelDto: CreateChannelDto) {
    return this.channelsService.update(id, updateChannelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.channelsService.remove(id);
  }
}
