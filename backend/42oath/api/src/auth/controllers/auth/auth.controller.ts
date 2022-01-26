import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthentificatedGuard, FranceConnectAuthGuard, IntraAuthGuard, OpenIdAuthGuard } from './guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    @Get('login')
    @UseGuards(IntraAuthGuard)
    login() {
        return;
    }

    @Get('login-fc')
    @UseGuards(FranceConnectAuthGuard)
    login_fc() {
        return;
    }

    @Get('login-oi')
    @UseGuards(OpenIdAuthGuard)
    login_oi() {
        return;
    }

    @Get('redirect')
        @UseGuards(IntraAuthGuard)
    redirect(@Res() res: Response) {
        res.sendStatus(200);
    }

    @Get('redirect-oi')
    @UseGuards(IntraAuthGuard)
    redirect_oi(@Res() res: Response) {
    res.sendStatus(200);
    }

    @Get('redirect-fc')
    @UseGuards(FranceConnectAuthGuard)
    redirect_fc(@Res() res: Response) {
    res.sendStatus(200);
    }

    @Get('status')
        @UseGuards(AuthentificatedGuard)
    status() {
        return 'ok';
    }

    @Get('logout')
    logout() {}
}
