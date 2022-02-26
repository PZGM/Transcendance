import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthentificatedGuard } from 'src/auth/controllers/auth/guards';
import { CustomRequest } from 'src/utils/types';
import { FriendsService } from './friends.service';
import { UsersService } from './../users/users.service';

@ApiTags('Friends')
@Controller('friends')
export class FriendsController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    @UseGuards(AuthentificatedGuard)
    public async getFriends(@Req() request: CustomRequest) {
        const userId: number = request.user.id;
        let friends: number[] = await this.userService.getFriends(userId);
        if (friends)
            return friends;
        throw new NotFoundException();
    }

    @Post()
    @UseGuards(AuthentificatedGuard)
    public async addFriend(@Req() request: CustomRequest, @Body() addFriendRequest: {id: number}) {
        const userId: number = request.user.id;
        let friends: number[] = await this.userService.getFriends(userId);
        if (friends.indexOf(addFriendRequest.id) != -1)
            throw new NotFoundException();
        friends.push(addFriendRequest.id);
        await this.userService.updateFriends(userId, friends);
    }


    @Get('/search/:search')
    @UseGuards(AuthentificatedGuard)
    public async searchFriends(@Req() request: CustomRequest, @Param('search') search: string) {
        const userId: number = request.user.id;
        let searchResults: number[] = await this.userService.findFriends(search, userId);
        if (searchResults)
            return searchResults;
        throw new NotFoundException();
    }

    @Delete()
    @UseGuards(AuthentificatedGuard)
    public async deleteFriend(@Req() request: CustomRequest, @Body() deleteFriendRequest: {id: number}) {
        const userId: number = request.user.id;
        let friends: number[] = await this.userService.getFriends(userId);
        if (!friends || friends.indexOf(deleteFriendRequest.id) == -1)
            throw new NotFoundException();
        friends.splice(friends.indexOf(deleteFriendRequest.id), 1);
        await this.userService.updateFriends(userId, friends);
    }
}
