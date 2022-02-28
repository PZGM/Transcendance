import { Controller, Post, Put, Get, NotFoundException, Param, Req, UseGuards, UseInterceptors, UploadedFile, Request, Res, Body, ConflictException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomRequest } from '../utils/types'
import { AuthentificatedGuard } from 'src/auth/controllers/auth/guards';
import { UsersService } from './users.service';



@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Get('/:id')
    @UseGuards(AuthentificatedGuard)
    public async getOne(@Req() request: CustomRequest, @Param('id') id: string) {
        const userId: number = (id === 'me') ? request.user.id : id as unknown as number;
        const user = await this.userService.getOne(userId);
        if (user)
            return user;  
        throw new NotFoundException();
    }

    @Get('/:id/login')
    @UseGuards(AuthentificatedGuard)
    public async getLogin(@Req() request: CustomRequest, @Param('id') id: string) {
        const userId: number = (id === 'me') ? request.user.id : id as unknown as number;
        const login = await this.userService.getUserLogin(userId);
        if (login)
            return login;
        throw new NotFoundException();

    }

    @Get('/:id/image')
    @UseGuards(AuthentificatedGuard)
    public async getImage(@Req() request: CustomRequest, @Param('id') id: string) {
        const userId: number = (id === 'me') ? request.user.id : id as unknown as number;
        const img = await this.userService.getUserImage(userId);
        if (img)
            return img;
        throw new NotFoundException();
    }

    @Put('/update/image')
    @UseGuards(AuthentificatedGuard)
    public async updateImage(@Req() request: CustomRequest, @Body() updateImageRequest: {image: string}) {
        const ret =  await this.userService.updateImage(request.user.id, updateImageRequest.image);
    }

    @Put('/update/login')
    @UseGuards(AuthentificatedGuard)
    public async updateLogin(@Req() request: CustomRequest, @Body() updateLoginRequest: {login: string}) {
        const ret =  await this.userService.updateLogin(request.user.id, updateLoginRequest.login);
        if (ret)
          throw new ConflictException();
    }
}
