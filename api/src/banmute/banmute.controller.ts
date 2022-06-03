import { Body, Controller, Put, Req, UseGuards, Get, Param, Delete } from '@nestjs/common';
import { FullyAuthentificatedGuard } from 'src/auth/controllers/auth/guards';
import { CustomRequest } from 'src/utils/types';
import { ApiTags } from '@nestjs/swagger';
import { BanmuteService } from './banmute.service';


@ApiTags('ban/mute')
@Controller('banmute')
export class BanmuteController {
constructor(private readonly banmuteService: BanmuteService) {}

    @Put('mute')
    @UseGuards(FullyAuthentificatedGuard)
    public async mute(@Req() request: CustomRequest, @Body() mute: {userId: number, channelId: number, date: Date}) {
        try {
            await this.banmuteService.addMute(request.user.id, mute.channelId, mute.userId, mute.date);
            return true;
        }
        catch(err) {
            return false;
        }
    }

    @Delete('mute')
    @UseGuards(FullyAuthentificatedGuard)
    public async unmute(@Req() @Body() mute: {userId: number, channelId: number}) {
        await this.banmuteService.deMute(mute.userId, mute.channelId);
        return true;
    }
  
    @Put('ban')
    @UseGuards(FullyAuthentificatedGuard)
    public async ban(@Req() request: CustomRequest, @Body() ban: {userId: number, channelId: number, date: Date}) {
        try {
            const ret =  await this.banmuteService.addBan(request.user.id, ban.channelId, ban.userId, ban.date);
            return true;
        }
        catch(err) {
            return false;
        }
    }

    @Get('mute-remaining/:channelId/:userId')
    @UseGuards(FullyAuthentificatedGuard)
    public async muteRemaining(@Req() request: CustomRequest, @Param('channelId') channelId: number, @Param('userId') userId: number ) {
        return await this.banmuteService.muteRemaining(userId, channelId);
    }

    @Get('ban-remaining/:channelId/:userId')
    @UseGuards(FullyAuthentificatedGuard)
    public async banRemaining(@Req() request: CustomRequest, @Param('channelId') channelId: number, @Param('userId') userId: number ) {
        return await this.banmuteService.banRemaining(userId, channelId);
    }

    @Delete('ban')
    @UseGuards(FullyAuthentificatedGuard)
    public async unban(@Req() @Body() mute: {userId: number, channelId: number}) {
        await this.banmuteService.unban(mute.userId, mute.channelId);
        return true;
    }
}
