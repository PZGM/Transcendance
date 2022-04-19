import { Controller, Get, Post, Req, Res, UseGuards, Redirect, Session } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Request } from 'express'
import { CustomRequest } from 'src/utils/types';
import { AuthentificatedGuard, FullyAuthentificatedGuard, IntraAuthGuard } from './guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    @Get('check')
    isLogeedIn(@Req() request: CustomRequest): boolean {
        return request.isAuthenticated();
    }

    @Get('login')
    @UseGuards(IntraAuthGuard)
    login() {
        return;
    }

    @Get('redirect')
    @UseGuards(IntraAuthGuard)
    redirect(@Res() res: Response, @Req() request: CustomRequest, @Session() session: Record<string, any>,
    ) {
        if (!request.user.firstLog) {
            request.user.firstLog = true;
            res.redirect(process.env.USER_INIT);
        }
        if (!request.user.twofa || session.istwofa)
            res.redirect(process.env.HOME_URL);
        else
            res.redirect(process.env.TWOFA_URL);
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