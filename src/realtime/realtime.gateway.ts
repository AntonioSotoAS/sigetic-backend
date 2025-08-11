import {
  WebSocketGateway, WebSocketServer,
  OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
} from '@nestjs/websockets'
import type { Server, Socket } from 'socket.io'
import { RealtimeService } from './realtime.service'

@WebSocketGateway({
  namespace: '/realtime',
  cors: { origin: ['http://localhost:3000'], credentials: true },
})
export class RealtimeGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server

  constructor(private readonly realtime: RealtimeService) {}

  afterInit() {
    this.realtime.setServer(this.server)
  }

  handleConnection(client: Socket) {
    const user = client.data?.user
    if (!user?.id) {
      client.disconnect(true)
      return
    }
    
    // Salas base por usuario y sede
    client.join(`user:${user.id}`)
    client.join(`tecnico:${user.id}`)
    
    if (user.sedeId) {
      client.join(`sede:${user.sedeId}`)
    }
    
    // Unirse a sala de tickets si es técnico o admin
    if (user.rol === 'TECNICO' || user.rol === 'ADMIN') {
      client.join('tickets:unassigned')
    }
  }

  handleDisconnect(_client: Socket) {
    // El cliente se desconecta automáticamente de todas las salas
  }
}
  