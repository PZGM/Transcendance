import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesService } from './message/messages.service';
import { UsersService } from 'src/users/users.service';
import { Difficulty } from 'src/game/components/coor';
import { ChannelsService } from './channel/channels.service';
import { BanmuteService } from 'src/banmute/banmute.service';
import { Channel } from 'src/typeorm/entities/channel';
import { RelationsPicker } from 'src/dto/chat.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';



interface MessageBody{
  chanId: number;
  authorId: number;
  content: string;
  service: boolean;
}

@WebSocketGateway({cors: {origin : 6200}, namespace: '/chat'})
export class ChatGateway {

  constructor(private readonly messageService: MessagesService,
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>  
  ){}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: Server) {}

  async broadcastJoinChannel(chanId: number, userId: number) {
    const message = await this.messageService.create({channelId: chanId, authorId: userId, content: 'JOIN', service: true});
    this.server.to('' + chanId).emit('service', {authorId: userId, content: 'JOIN', channelId: chanId, date: message.createdDate});
  }

  async broadcastLeaveChannel(chanId: number, userId: number) {
    const message = await this.messageService.create({channelId: chanId, authorId: userId, content: 'LEAVE', service: true});
    this.server.to('' + chanId).emit('service', {authorId: userId, content: 'LEAVE', channelId: chanId, date: message.createdDate});
  }

  async broadcastPromoteAdmin(chanId: number, userId: number) {
    const message = await this.messageService.create({channelId: chanId, authorId: userId, content: 'PROMOTE', service: true});
    this.server.to('' + chanId).emit('service', {authorId: userId, content: 'PROMOTE', channelId: chanId, date: message.createdDate});
  }

  async broadcastDemoteAdmin(chanId: number, userId: number) {
    const message = await this.messageService.create({channelId: chanId, authorId: userId, content: 'DEMOTE', service: true});
    this.server.to('' + chanId).emit('service', {authorId: userId, content: 'DEMOTE', channelId: chanId, date: message.createdDate});
  }

  async broadcastNewOwner(chanId: number, userId: number) {
    const message = await this.messageService.create({channelId: chanId, authorId: userId, content: 'OWNERED', service: true});
    this.server.to('' + chanId).emit('service', {authorId: userId, content: 'OWNERED', channelId: chanId, date: message.createdDate});
  }

  async broadcastMuted(chanId: number, userId: number) {
    const message = await this.messageService.create({channelId: chanId, authorId: userId, content: 'MUTE', service: true});
    this.server.to('' + chanId).emit('service', {authorId: userId, content: 'MUTE', channelId: chanId, date: message.createdDate});
  }

  async broadcastUnmuted(chanId: number, userId: number) {
    const message = await this.messageService.create({channelId: chanId, authorId: userId, content: 'UNMUTE', service: true});
    this.server.to('' + chanId).emit('service', {authorId: userId, content: 'UNMUTE', channelId: chanId, date: message.createdDate});
  }

  async broadcastBanned(chanId: number, userId: number) {
    const message = await this.messageService.create({channelId: chanId, authorId: userId, content: 'BANNED', service: true});
    this.server.to('' + chanId).emit('service', {authorId: userId, content: 'BANNED', channelId: chanId, date: message.createdDate});
  }

  async broadcastUnbanned(chanId: number, userId: number) {
    const message = await this.messageService.create({channelId: chanId, authorId: userId, content: 'UNBANNED', service: true});
    this.server.to('' + chanId).emit('service', {authorId: userId, content: 'UNBANNED', channelId: chanId, date: message.createdDate});
  }

  async broadcastProfileUpdated(chanId: number, userId: number) {
    const date: Date = new Date(Date.now());
    this.server.to('' + chanId).emit('service', {authorId: userId, content: 'PROFILED', channelId: chanId, date});
  }

  async broadcastLoginUpdated(chanId: number, userId: number) {
    const message = await this.messageService.create({channelId: chanId, authorId: userId, content: 'LOGINED', service: true});
    this.server.to('' + chanId).emit('service', {authorId: userId, content: 'LOGINED', channelId: chanId, date: message.createdDate});
  }

  @SubscribeMessage('invitation')
  async invitationHandler(@ConnectedSocket() socket: Socket, @MessageBody() data : { chanId: number, userId: number, difficulty: Difficulty }) {
    if (data.difficulty === 0) {
      const message = await this.messageService.create({channelId: data.chanId, authorId: data.userId, content: 'INVITE-EASY', service: true});
      this.server.to('' + data.chanId).emit('service', {authorId: data.userId, content: 'INVITE-EASY', channelId: data.chanId, date: message.createdDate, id: message.id});
    }
    else if (data.difficulty === 1) {
      const message = await this.messageService.create({channelId: data.chanId, authorId: data.userId, content: 'INVITE-MEDIUM', service: true});
      this.server.to('' + data.chanId).emit('service', {authorId: data.userId, content: 'INVITE-MEDIUM', channelId: data.chanId, date: message.createdDate, id: message.id});
    }
    else if (data.difficulty === 2) {
      const message = await this.messageService.create({channelId: data.chanId, authorId: data.userId, content: 'INVITE-HARD', service: true});
      this.server.to('' + data.chanId).emit('service', {authorId: data.userId, content: 'INVITE-HARD', channelId: data.chanId, date: message.createdDate, id: message.id});
    }
  }

  async handleConnection(socket: Socket) {
    this.logger.log(`Client connected: ${socket.id}`);
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: MessageBody
  ) {
    if (!await this.userIsInChannel(data.authorId, data.chanId))
      return;
    if (!await this.userCanSend(data.authorId, data.chanId))
      return

    let message = await this.messageService.create({channelId: data.chanId, authorId: data.authorId, content: data.content, service: data.service})
    this.server.to('' + data.chanId).emit('message', {authorId: message.author.id, content: message.content, channelId: message.channel.id, date: message.createdDate, service: message.service, id: message.id});
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(socket: Socket, data: any) {
    const ret = await this.userIsInChannel(data.userId, data.id);
    if (!ret){
      return;
    }
    socket.join('' + data.id);
   this.logger.log(`Client [${socket.id}] joined Room ${data.id}`);
    socket.emit('joinedRoom', data.id);
  }

  @SubscribeMessage('leaveRoom')
  handleLeftRoom(socket: Socket, data: any) {
    socket.leave('' + data.id);
    this.logger.log(`Client [${socket.id}] left Room ${data.id}`);
    socket.emit('leftRoom', data.id);
  }

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
        const chan: Channel = await this.channelRepository.findOneOrFail({
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

  public async userCanSend(userId: number, channelId: number) {
    const channel = await this.getOne(channelId, {withMuted: true});
    if (channel.mute.some((mute) => {
        if (mute.user.id == userId && mute.endOfMute > new Date(Date.now()))
          return true;
        return false;
      }))
      return false;
    return true;
  }

  public async userIsInChannel(userId: number, channelId: number): Promise<boolean> {
    const channel: Channel = await this.getOne(channelId);
    if (!channel)
        return false;
    const ret = channel.users.some((user) => {return user.id == userId});
    return ret;
}
}