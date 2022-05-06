import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway({/* namespace: 'message', */cors: {origin : 6200} })
export class ChatGateway {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: Server) {
    console.log("heyyyyy");
    this.logger.log('Init ChatGateway');
  }

  // async handleConnection(socket: Socket) {
  //   console.log("ca marche ? hendle connec")
  //   this.logger.log(`Client connected: ${socket.id}`);
  // }
  // handleDisconnect(client: Socket) {
  //   this.logger.log(`Client disconnected: ${client.id}`);
  // }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    console.log(message);
    this.server.emit('message', message);
  }

  @SubscribeMessage('')
  handleMessage2(@MessageBody() message: string): void {
    console.log(message);
    console.log('deux')
    this.server.emit('message', message);
  }
  /*@SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: string
  ) {
    this.logger.log(`Received message: ${data}`);
    this.server.emit('messageToClient', { data });
    console.log(data);
  }
*/
  // @SubscribeMessage('joinChannel')
  // handleJoinChannel(socket: Socket, channelName: string) {
  //   socket.join(channelName);
  //   this.logger.log(`Client [${socket.id}] joined channel ${channelName}`);
  //   socket.emit('joinedChannel', channelName);
  // }

  // @SubscribeMessage('leaveChannel')
  // handleLeftChannel(socket: Socket, channelName: string) {
  //   socket.leave(channelName);
  //   this.logger.log(`Client [${socket.id}] left channel ${channelName}`);
  //   socket.emit('leftChannel', channelName);
  // }
}
