import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway({cors: {origin : 6200} })
export class ChatGateway {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: Server) {
    console.log("heyyyyy");
    console.log('Init ChatGateway');
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
    @MessageBody() data: string
  ) {
    console.log(`Received message: ${data}`);
    this.server.emit('messageToClient global', { data });
    this.server.to("test").emit('messageToClient test channel', { data });
    console.log(data);
  }

  @SubscribeMessage('joinChannel')
  handleJoinChannel(socket: Socket, channelName: string) {
    socket.join(channelName);
    console.log(`Client [${socket.id}] joined channel ${channelName}`);
    socket.emit('joinedChannel', channelName);
  }

  @SubscribeMessage('leaveChannel')
  handleLeftChannel(socket: Socket, channelName: string) {
    socket.leave(channelName);
    console.log(`Client [${socket.id}] left channel ${channelName}`);
    socket.emit('leftChannel', channelName);
  }
}
