import { Controller, Get, NotFoundException, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express'
import { AuthentificatedGuard } from 'src/auth/controllers/auth/guards';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Get('/me')
    @UseGuards(AuthentificatedGuard)
    public async getSelf(@Req() request: Request) {
        console.log(request.session.id)
        const user = await this.userService.getOne(0);
        if (user)
            return user;  
        throw new NotFoundException();
    }

    @Get('/:id')
    @UseGuards(AuthentificatedGuard)
    public async getOne(@Param('id') userId: number) {
        const user = await this.userService.getOne(userId);
        if (user)
            return user;  
        throw new NotFoundException();
    }

    @Get('/:id/login')
    @UseGuards(AuthentificatedGuard)
    public async getLogin(@Param('id') userId: number) {
        const login = await this.userService.getUserLogin(userId);
        if (login)
            return login;
        throw new NotFoundException();

    }

    @Get('/:id/image')
    @UseGuards(AuthentificatedGuard)
    public async getImage(@Param('id') userId: number) {
        const img = await this.userService.getUserImage(userId);
        if (img)
            return img;
        throw new NotFoundException();
    }

    
}
