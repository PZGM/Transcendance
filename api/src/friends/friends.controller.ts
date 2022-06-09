import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FullyAuthentificatedGuard } from 'src/auth/controllers/auth/guards';
import { CustomRequest } from 'src/utils/types';
import { UsersService } from './../users/users.service';
import { UserDto } from 'src/dto/user.dto';
import { FriendRequestDto } from 'src/dto/friend.dto';
import { Logger } from '@nestjs/common';

@ApiTags('Friends')
@Controller('friends')
export class FriendsController {
    constructor(private readonly userService: UsersService) {}
	private logger = new Logger("FriendsController")

    @Get()
    @UseGuards(FullyAuthentificatedGuard)
    public async getFriends(@Req() request: CustomRequest) {
        this.logger.log("getFriends");
        const userId: number = request.user.id;
        let friends: UserDto[] = await this.userService.getFriends(userId);
        if (friends)
            return friends;
        throw new NotFoundException();
    }

    @Post()
    @UseGuards(FullyAuthentificatedGuard)
    public async addFriend(@Req() request: CustomRequest, @Body() addFriendRequest: FriendRequestDto) {
        this.logger.log("addFriends");
        const userId: number = request.user.id;
        return await this.userService.addFriends(userId, [addFriendRequest.id]);
    }

    @Get('/search/:search')
    @UseGuards(FullyAuthentificatedGuard)
    public async searchNewFriends(@Req() request: CustomRequest, @Param('search') search: string) {
        this.logger.log("searchNewFriends");
        const userId: number = request.user.id;
        search = search.replace(/\W/g, '');
        let searchResults: UserDto[] = await this.userService.findFriends(search, userId);
        if (searchResults)
            return searchResults;
        throw new NotFoundException();
    }

    @Delete()
    @UseGuards(FullyAuthentificatedGuard)
    public async deleteFriend(@Req() request: CustomRequest, @Body() deleteFriendRequest: FriendRequestDto) {
        this.logger.log("deleteFriend");
        const userId: number = request.user.id;
        return await this.userService.removeFriends(userId, [deleteFriendRequest.id]);
    }
}
