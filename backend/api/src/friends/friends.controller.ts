import { Body, Controller, Delete, Get, NotFoundException, Post, Req, UseGuards } from '@nestjs/common';
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
        if (!friends || friends.indexOf(addFriendRequest.id) != -1)
            throw new NotFoundException();
        friends.push(addFriendRequest.id);
        await this.userService.updateFriends(userId, friends);
    }

    @Delete()
    @UseGuards(AuthentificatedGuard)
    public async deleteFriend(@Req() request: CustomRequest, @Body() addFriendRequest: {id: number}) {
        const userId: number = request.user.id;
        let friends: number[] = await this.userService.getFriends(userId);
        if (!friends || friends.indexOf(addFriendRequest.id) == -1)
            throw new NotFoundException();
        friends.splice(friends.indexOf(addFriendRequest.id), 1);
        await this.userService.updateFriends(userId, friends);
    }
}
