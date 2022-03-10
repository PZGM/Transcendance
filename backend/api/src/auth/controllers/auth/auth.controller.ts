import { Controller, Get, Post, Req, Res, UseGuards, Redirect } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Request } from 'express'
import { CustomRequest } from 'src/utils/types';
import { AuthentificatedGuard, FullyAuthentificatedGuard, IntraAuthGuard } from './guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    @Get('login')
    @UseGuards(IntraAuthGuard)
    login() {
        return;
    }

    @Get('redirect')
    @UseGuards(IntraAuthGuard)
    redirect(@Res() res: Response) {
        res.redirect(process.env.PROFILE_URL);

    }

    @Get('status')
    @UseGuards(FullyAuthentificatedGuard)
    status(@Req() request: CustomRequest) {
        return `Logged in as ${request.user.login}`;
    }

    @UseGuards(AuthentificatedGuard)
    @Post('logout')
    async logOut(@Req() request: Request) {
        request.logOut();
        request.session.cookie.maxAge = 0;
    }
  
}