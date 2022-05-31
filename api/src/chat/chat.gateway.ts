import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesService } from './message/messages.service';
import { UsersService } from 'src/users/users.service';
import { Difficulty } from 'src/game/components/coor';

interface MessageBody{
  chanId: number;
  authorId: number;
  content: string;
  service: boolean;
}

@WebSocketGateway({cors: {origin : 6200}, namespace: '/chat'})
export class ChatGateway {

  constructor(private readonly messageService: MessagesService, private readonly userService: UsersService){

  }

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: Server) {
  
  }

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

  @SubscribeMessage('invitation')
  async invitationHandler(@ConnectedSocket() socket: Socket, @MessageBody() data : { chanId: number, userId: number, difficulty: Difficulty }) {
    console.log('invitation')
    console.log(`difficulty: ${data.difficulty}`)
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
    console.log(`Client connected: ${socket.id}`);
  }
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: MessageBody
  ) {
    if (!await this.userService.userIsInChannel(data.authorId, data.chanId))
      return;
    let message = await this.messageService.create({channelId: data.chanId, authorId: data.authorId, content: data.content, service: data.service})
    this.server.to('' + data.chanId).emit('message', {authorId: message.author.id, content: message.content, channelId: message.channel.id, date: message.createdDate, service: message.service, id: message.id});
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(socket: Socket, data: any) {
    const ret = await this.userService.userIsInChannel(data.userId, data.id);
    if (!ret){
      return;
    }
    socket.join('' + data.id);
    console.log(`Client [${socket.id}] joined Room ${data.id}`);
    socket.emit('joinedRoom', data.id);
  }

  @SubscribeMessage('leaveRoom')
  handleLeftRoom(socket: Socket, data: any) {
    socket.leave('' + data.id);
    console.log(`Client [${socket.id}] left Room ${data.id}`);
    socket.emit('leftRoom', data.id);
  }
}