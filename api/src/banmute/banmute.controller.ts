import { Body, Controller, Put, Req, UseGuards, Get, Param, Delete } from '@nestjs/common';
import { FullyAuthentificatedGuard } from 'src/auth/controllers/auth/guards';
import { CustomRequest } from 'src/utils/types';
import { ApiTags } from '@nestjs/swagger';
import { BanmuteService } from './banmute.service';
import { Logger } from '@nestjs/common';


@ApiTags('ban/mute')
@Controller('banmute')
export class BanmuteController {
constructor(private readonly banmuteService: BanmuteService) {}
private logger = new Logger("BanmuteController")

    @Put('mute')
    @UseGuards(FullyAuthentificatedGuard)
    public async mute(@Req() request: CustomRequest, @Body() mute: {userId: number, channelId: number, date: Date}) {
        this.logger.log("mute : mute");
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
        this.logger.log("unmute : mute");
        await this.banmuteService.deMute(mute.userId, mute.channelId);
        return true;
    }
  
    @Put('ban')
    @UseGuards(FullyAuthentificatedGuard)
    public async ban(@Req() request: CustomRequest, @Body() ban: {userId: number, channelId: number, date: Date}) {
        this.logger.log("ban : ban");
        try {
            const ret =  await this.banmuteService.addBan(request.user.id, ban.channelId, ban.userId, ban.date);
            return true;
        }
        catch(err) {
            return false;
        }
    }

    @Get('current-mute/:channelId')
    @UseGuards(FullyAuthentificatedGuard)
    public async currentMute(@Req() request: CustomRequest, @Param('channelId') channelId: number) {
        this.logger.log("curent mute : current mute/:channelId/:userId");
        return await this.banmuteService.currentMute(channelId);
    }

    @Get('mute-remaining/:channelId/:userId')
    @UseGuards(FullyAuthentificatedGuard)
    public async muteRemaining(@Req() request: CustomRequest, @Param('channelId') channelId: number, @Param('userId') userId: number ) {
        this.logger.log("muteRemaining : mute-remaining/:channelId/:userId");
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
