import { Controller, Post, Put, Get, NotFoundException, Param, Req, UseGuards, UseInterceptors, UploadedFile, Request, Res, Body, ConflictException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomRequest } from '../utils/types'
import { FullyAuthentificatedGuard } from 'src/auth/controllers/auth/guards';
import { UsersService } from './users.service';
import { UserDto } from 'src/dto/user.dto';
import { isNumber } from 'class-validator';



@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Get('/:id')
    @UseGuards(FullyAuthentificatedGuard)
    public async getOne(@Req() request: CustomRequest, @Param('id') id: string) {
        const userId: number = (id === 'me') ? request.user.id : parseInt(id, 10);

        if (!isNumber(userId))
            throw new NotFoundException();
        const user = await this.userService.getOne(userId);
        if (user)
            return new UserDto(user);  
        throw new NotFoundException();
    }

    @Get('/:id/user/login')
    @UseGuards(FullyAuthentificatedGuard)
    public async getUserByLogin(@Req() request: CustomRequest, @Param('id') id: string) {
        const user = await this.userService.getUserByLogin(id, {withStats: true});
        if (user)
            return new UserDto(user);  
        throw new NotFoundException();
    }

    @Get('/:id/login')
    @UseGuards(FullyAuthentificatedGuard)
    public async getLogin(@Req() request: CustomRequest, @Param('id') id: string) {
        const userId: number = (id === 'me') ? request.user.id : parseInt(id, 10);
        if (!isNumber(userId))
            throw new NotFoundException();        
            const login = await this.userService.getUserLogin(userId);
        if (login)
            return login;
        throw new NotFoundException();
    }

    @Get('/:id/image')
    @UseGuards(FullyAuthentificatedGuard)
    public async getImage(@Req() request: CustomRequest, @Param('id') id: string) {
        const userId: number = (id === 'me') ? request.user.id : parseInt(id, 10);
        if (!isNumber(userId))
            throw new NotFoundException();        
            const img = await this.userService.getUserImage(userId);
        if (img)
            return img;
        throw new NotFoundException();
    }

    @Get('/:id/channels/name')
    @UseGuards(FullyAuthentificatedGuard)
    public async getChannelsNames(@Req() request: CustomRequest, @Param('id') id: string) {
        const userId: number = (id === 'me') ? request.user.id : parseInt(id, 10);
        if (!isNumber(userId))
            throw new NotFoundException();        
        const chans = await (await this.userService.getChannels(userId));
        const chanNames = chans.map((chan) => {return chan.name});
        if (chanNames)
            return chanNames;
        throw new NotFoundException();
    }

    @Put('/update/image')
    @UseGuards(FullyAuthentificatedGuard)
    public async updateImage(@Req() request: CustomRequest, @Body() updateImageRequest: {image: string}) {
        const ret =  await this.userService.updateImage(request.user.id, updateImageRequest.image);
    }

    @Put('/update/login')
    @UseGuards(FullyAuthentificatedGuard)
    public async updateLogin(@Req() request: CustomRequest, @Body() updateLoginRequest: {login: string}) {
        const ret =  await this.userService.updateLogin(request.user.id, updateLoginRequest.login);
        if (ret)
          throw new ConflictException();
    }

    @Put('/update/color')
    @UseGuards(FullyAuthentificatedGuard)
    public async updateColor(@Req() request: CustomRequest, @Body() updateColorRequest: {color: string}) {
        const ret =  await this.userService.updateColor(request.user.id, updateColorRequest.color);
        if (ret)
          throw new ConflictException();
    }


    @Put('update/addBlockedUser')
    @UseGuards(FullyAuthentificatedGuard)
    public async addBlockedUser(@Req() request: CustomRequest, @Body() updateUserRequest: {id: number}) {
        const ret =  await this.userService.addBlockedUser(request.user.id, updateUserRequest.id);
    }

    @Put('/update/removeBlockedUser')
    @UseGuards(FullyAuthentificatedGuard)
    public async removeBlockedUser(@Req() request: CustomRequest, @Body() updateUserRequest: {id: number}) {
        const ret =  await this.userService.removeBlockedUser(request.user.id, updateUserRequest.id);
    }

    @Get('/search/:search')
    @UseGuards(FullyAuthentificatedGuard)
    public async searchNewFriends(@Req() request: CustomRequest, @Param('search') search: string) {
        const userId: number = request.user.id;
        search = search.replace(/\W/g, '');
        let searchResults: UserDto[] = await this.userService.findUsers(search, userId);
        if (searchResults)
            return searchResults;
        throw new NotFoundException();
    }
}