import { Controller, Get, NotFoundException, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomRequest } from '../utils/types'
import { AuthentificatedGuard } from 'src/auth/controllers/auth/guards';
import { User } from 'src/typeorm';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Get('/me')
    @UseGuards(AuthentificatedGuard)
    public async getSelf(@Req() request: CustomRequest) {
        console.log(typeof(request));
        const userId: number = request.user.id;
        const user = await this.userService.getOne(userId);
        if (user)
            return user;  
        throw new NotFoundException();
    }

    @Get('/me/login')
    @UseGuards(AuthentificatedGuard)
    public async getSelfLogin(@Req() request: CustomRequest) {
        console.log(typeof(request));
        const userId: number = request.user.id;
        const login = await this.userService.getUserLogin(userId);
        if (login)
            return login;  
        throw new NotFoundException();
    }

    @Get('/me/image')
    @UseGuards(AuthentificatedGuard)
    public async getSelfImage(@Req() request: CustomRequest) {
        console.log(typeof(request));
        const userId: number = request.user.id;
        const image = await this.userService.getUserImage(userId);
        if (image)
            return image;  
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
