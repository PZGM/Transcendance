import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthentificatedGuard, IntraAuthGuard } from './guards';


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
