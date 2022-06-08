import { Controller, Put, Get, NotFoundException, Param, Req, UseGuards, Body, ConflictException, Query, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomRequest } from '../utils/types'
import { FullyAuthentificatedGuard } from 'src/auth/controllers/auth/guards';
import { UsersService } from './users.service';
import { UserDto, UserRelationsPicker } from 'src/dto/user.dto';
import { isNumber } from 'class-validator';
import { Logger } from '@nestjs/common';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    
    constructor(private readonly userService: UsersService) {}
	private logger = new Logger("UsersController")

    @Get('/:id')
    @UseGuards(FullyAuthentificatedGuard)
    public async getOne(@Req() request: CustomRequest, @Param('id') id: string, @Query() query?) {
        const userId: number = (id === 'me') ? request.user.id : parseInt(id, 10);
        if (!isNumber(userId))
            throw new NotFoundException();
        const options: UserRelationsPicker = {
                withChannels: query?.withChannels === 'true',
                withBlocked: query?.withBlocked === 'true',
                withStats: query?.withStats === 'true',
                withGames: query?.withGames === 'true',
                withFriends: query?.withFriends === 'true',
            }
        const user = await this.userService.getOne(userId, options);
        if (user)
            return new UserDto(user);  
        throw new NotFoundException();
    }

    @Get('/:id/user/login')
    @UseGuards(FullyAuthentificatedGuard)
    public async getUserByLogin(@Req() request: CustomRequest, @Param('id') id: string) {
        this.logger.log("getUserByLogin");
        const user = await this.userService.getUserByLogin(id, {withStats: true});
        if (user)
            return new UserDto(user);  
        throw new NotFoundException();
    }

    @Get('/:id/login')
    @UseGuards(FullyAuthentificatedGuard)
    public async getLogin(@Req() request: CustomRequest, @Param('id') id: string) {
        this.logger.log("getLogin");
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
        this.logger.log("getImage");
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
        this.logger.log("getChannelsNames");
        const userId: number = (id === 'me') ? request.user.id : parseInt(id, 10);
        if (!isNumber(userId))
            throw new NotFoundException();        
        const chans = await (await this.userService.getChannels(userId));
        const chanNames = chans.map((chan) => {return chan.name});
        const channelsNames = chanNames.filter((name) => {return !(name.startsWith('*'))});
        if (channelsNames)
            return channelsNames;
        throw new NotFoundException();
    }

    @Put('/update/image')
    @UseGuards(FullyAuthentificatedGuard)
    public async updateImage(@Req() request: CustomRequest, @Body() updateImageRequest: {image: string}) {
        this.logger.log("updateImage");
        const ret =  await this.userService.updateImage(request.user.id, updateImageRequest.image);
    }

    @Put('/update/login')
    @UseGuards(FullyAuthentificatedGuard)
    public async updateLogin(@Req() request: CustomRequest, @Body() updateLoginRequest: {login: string}) {
        this.logger.log("updateLogin");
        const ret =  await this.userService.updateLogin(request.user.id, updateLoginRequest.login);
        if (ret === 1)
            return false;
        return true
    }

    @Put('/update/color')
    @UseGuards(FullyAuthentificatedGuard)
    public async updateColor(@Req() request: CustomRequest, @Body() updateColorRequest: {color: string}) {
        this.logger.log("updateColor");
        const ret =  await this.userService.updateColor(request.user.id, updateColorRequest.color);
        if (ret)
          throw new ConflictException();
    }

    @Put('block/:id')
    @UseGuards(FullyAuthentificatedGuard)
    public async addBlockedUser(@Req() request: CustomRequest, @Param('id') id: number): Promise<boolean> {
        this.logger.log("addBlockedUser");
        return await this.userService.addBlockedUser(request.user.id, id);
    }

    @Delete('block/:id')
    @UseGuards(FullyAuthentificatedGuard)
    public async removeBlockedUser(@Req() request: CustomRequest, @Param('id') id: number): Promise<boolean> {
        this.logger.log("removeBlockedUser");
        return await this.userService.removeBlockedUser(request.user.id, id);
    }

    @Get('/search/:search')
    @UseGuards(FullyAuthentificatedGuard)
    public async searchNewFriends(@Req() request: CustomRequest, @Param('search') search: string) {
        this.logger.log("searchNewFriends");
        const userId: number = request.user.id;
        search = search.replace(/\W/g, '');
        let searchResults: UserDto[] = await this.userService.findUsers(search, userId);
        if (searchResults)
            return searchResults;
        throw new NotFoundException();
    }
}

