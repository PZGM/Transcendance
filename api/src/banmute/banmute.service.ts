import { Injectable, NotFoundException } from '@nestjs/common';
import { Channel, Mute } from 'src/typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ban } from 'src/typeorm/entities/BannedUser';
import { UsersService } from 'src/users/users.service';
import { ChannelsService } from 'src/chat/channel/channels.service';
import { RelationsPicker } from 'src/dto/chat.dto';
import { ChatGateway } from 'src/chat/chat.gateway';

@Injectable()
export class BanmuteService {

constructor(
    @InjectRepository(Channel)
    private readonly channelsRepository: Repository<Channel>,
    private readonly usersService: UsersService,
    private readonly chatGateway: ChatGateway,
  ) {}

  public async getOne(channelId: number, relationsPicker?:RelationsPicker): Promise<Channel|null> {
    try {
        let relations: string[] = [];
        if (relationsPicker) {
            relationsPicker.withOwner && relations.push('owner');
            relationsPicker.withChat && relations.push('chats');
            relationsPicker.withMuted && relations.push('mute');
            relationsPicker.withAdmin && relations.push('admin');
            relationsPicker.withBanned && relations.push('ban');

        }
        const chan: Channel = await this.channelsRepository.findOneOrFail({
            relations,
            where: {
                id: channelId
            }
        });
        return chan;
    }
    catch (e) {
        return null;
    }
  }

  public async addMute(userId: number ,channelId: number, muteId: number, date : Date) {
    const channel: Channel | null = await this.getOne(channelId, {withAdmin: true, withMuted: true});
    if (!channel) {
      throw new NotFoundException(`Channel [${channelId}] not found`);
    }
    if (!channel.admin.some((admin) => {return admin.id == userId})) {
      throw new NotFoundException(`User not found in the admin data`);
    }
    try {
      let muted : Mute = new Mute();
      muted.endOfMute = new Date(date);
      muted.muter = await this.usersService.getOne(userId);
      muted.user = await this.usersService.getOne(muteId);
      channel.mute.push(muted);
    }
    catch (e) {
      console.log('error while muting')
      return null;
    }
    await this.chatGateway.broadcastMuted(channelId, muteId);
    let ret = await this.channelsRepository.save(channel);
  }

  public async deMute(userId: number ,channelId: number) {
    const channel: Channel | null = await this.getOne(channelId, {withAdmin: true, withMuted: true});
    if (!channel) {
      throw new NotFoundException(`Channel [${channelId}] not found`);
    }
    channel.mute = channel.mute.filter((mute) => {return mute.user.id != userId})
    await this.chatGateway.broadcastUnmuted(channelId, userId);
    let ret = await this.channelsRepository.save(channel);
  }

  public async addBan(userId: number ,channelId: number, banId: number, date : Date) {
    const channel: Channel | null = await this.getOne(channelId, {withAdmin: true, withBanned: true});
    if (!channel) {
      throw new NotFoundException(`Channel [${channelId}] not found`);
    }
    if (!channel.admin.some((admin) => {return admin.id == userId})) {
      throw new NotFoundException(`User not found in the admin data`);
    }
    if (channel.admin.some((admin) => {return admin.id == banId})) {
      throw new NotFoundException(`Can't ban an admin`);
    } 
    if (!channel.ban.some((ban: Ban) => {return  ban.user.id == banId})) {
      try {
        let banned : Ban = new Ban();
        banned.endOfBan = new Date(date);
        banned.banner = await this.usersService.getOne(userId);
        banned.user = await this.usersService.getOne(banId);
        channel.ban.push(banned);
        channel.users = channel.users.filter((user) => {return user.id != banId})
      }
      catch (e) {
         return null;
      }
      await this.chatGateway.broadcastBanned(channelId, banId);
      return this.channelsRepository.save(channel);
    }
  }

  public async muteRemaining(userId: number, channelId: number) {
    const channel = await this.getOne(channelId, {withMuted: true});
    let maxMute = -1;
    channel.mute.forEach(mute => {
      if (mute.endOfMute.valueOf() - Date.now() < 0) {
        channel.mute = channel.mute.filter((muted) => {return muted.id != mute.id});
        this.channelsRepository.save(channel);
      }
      if (mute.user.id == userId) {
        if (mute.endOfMute.valueOf() - Date.now() > maxMute)
        maxMute = mute.endOfMute.valueOf() - Date.now();
      }
    });
    return maxMute
  }

  public async currentMute(channelId: number) {
    const channel = await this.getOne(channelId, {withMuted: true});
    const muted = channel.mute.map(mute => {
      if (mute.endOfMute.valueOf() - Date.now() < 0) {
        return;
      }
      return mute.id 
    });
    return muted
  }

  public async banRemaining(userId: number, channelId: number) {
    const channel = await this.getOne(channelId, {withBanned: true});
    let maxBan = -1;
    channel.ban.forEach(ban => {
      if (ban.endOfBan.valueOf() - Date.now() < 0) {
        channel.ban = channel.ban.filter((banned) => {return banned.id != ban.id});
        this.channelsRepository.save(channel);
      }
      if (ban.user.id == userId) {
        if (ban.endOfBan.valueOf() - Date.now() > maxBan)
        maxBan = ban.endOfBan.valueOf() - Date.now();
      }
    });
    return maxBan
  }

  public async unban(userId: number ,channelId: number) {
    const channel: Channel | null = await this.getOne(channelId, {withAdmin: true, withBanned: true});
    if (!channel) {
      throw new NotFoundException(`Channel [${channelId}] not found`);
    }
    channel.ban = channel.ban.filter((ban) => {return ban.user.id != userId});
    await this.chatGateway.broadcastUnbanned(channelId, userId);
    let ret = await this.channelsRepository.save(channel);
  }

}
