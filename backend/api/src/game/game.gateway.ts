import { Logger } from '@nestjs/common';
import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';

@WebSocketGateway(8001)
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    wss: any;

    private logger = new Logger('GameGateway');

    handleConnection(client: { emit: (arg0: string, arg1: string) => void; }) {
        console.log("je suis dans app gateway")
        this.logger.log('New client connected');
        client.emit('connection', 'Successfully connected to server');
    }

    handleDisconnect(client: any) {
        this.logger.log('Client disconnected');
    }
}