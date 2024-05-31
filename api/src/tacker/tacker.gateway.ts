import { WebSocketGateway, 
  WebSocketServer, 
  SubscribeMessage, 
  OnGatewayInit, 
  OnGatewayConnection, 
  OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { CoordinatesDto } from './dto/coordinates.dto';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TrackerGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() 
  server: Server;
  private logger = new Logger('TrackerGateway');

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('coordinates')
  handleCoordinates(client: Socket, payload:CoordinatesDto) {
    console.log(`Received coordinates: Latitude - ${payload.latitude}, Longitude - ${payload.longitude}`);
  }
}
