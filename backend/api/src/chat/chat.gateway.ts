import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesService } from './message/messages.service';

interface MessageBody{
  chanId: number;
  authorId: number;
  content: string;
  service: boolean;
}

@WebSocketGateway({cors: {origin : 6200}, namespace: '/chat'})
export class ChatGateway {

  constructor(private readonly messageService: MessagesService){

  }

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: Server) {
  
  }

  handleJoinChannel() {
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
    this.server.to('' + data.chanId).emit('message', {authorId: data.authorId, content: data.content});
    // this.messageService.create({channelId: data.chanId, authorId: data.authorId, content: data.content, service: data.service})
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(socket: Socket, data: any) {
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
