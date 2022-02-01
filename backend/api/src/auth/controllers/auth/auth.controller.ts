import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Request } from 'express'
import { AuthentificatedGuard, IntraAuthGuard } from './guards';

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
        res.sendStatus(200);
    }

    @Get('status')
        @UseGuards(AuthentificatedGuard)
    status() {
        return 'ok';
    }

    @Get('logout')
    logout(@Req() request: Request) {
    // request.session.destroy()
    }
 }
