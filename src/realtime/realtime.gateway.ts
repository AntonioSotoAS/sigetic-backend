import {
  WebSocketGateway, WebSocketServer,
  OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
} from '@nestjs/websockets'
import type { Server, Socket } from 'socket.io'
import { RealtimeService } from './realtime.service'
import { Logger } from '@nestjs/common'

@WebSocketGateway({
  namespace: '/realtime',
  cors: { origin: ['http://localhost:3000'], credentials: true },
})
export class RealtimeGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server
  private readonly logger = new Logger(RealtimeGateway.name)

  constructor(private readonly realtime: RealtimeService) {}

  afterInit() {
    this.realtime.setServer(this.server)
    this.logger.log('🚀 WebSocket Gateway inicializado')
  }

  handleConnection(client: Socket) {
    const user = client.data?.user
    const clientId = client.id
    const userAgent = client.handshake.headers['user-agent'] || 'Unknown'
    const ip = client.handshake.address || 'Unknown'
    
    this.logger.log(`🔌 NUEVA CONEXIÓN WEBSOCKET:`)
    this.logger.log(`   📱 Client ID: ${clientId}`)
    this.logger.log(`   🌐 IP: ${ip}`)
    this.logger.log(`   🖥️  User Agent: ${userAgent}`)
    
    if (!user?.id) {
      this.logger.warn(`❌ CONEXIÓN RECHAZADA - Usuario no autenticado`)
      this.logger.warn(`   📱 Client ID: ${clientId}`)
      this.logger.warn(`   🌐 IP: ${ip}`)
      client.disconnect(true)
      return
    }
    
    this.logger.log(`✅ USUARIO CONECTADO:`)
    this.logger.log(`   👤 ID: ${user.id}`)
    this.logger.log(`   📧 Email: ${user.correo}`)
    this.logger.log(`   🏢 Rol: ${user.rol}`)
    this.logger.log(`   🏢 Sede ID: ${user.sedeId || 'N/A'}`)
    this.logger.log(`   📱 Client ID: ${clientId}`)
    this.logger.log(`   🌐 IP: ${ip}`)
    
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
    
    this.logger.log(`🎯 SALAS ASIGNADAS:`)
    this.logger.log(`   👤 user:${user.id}`)
    this.logger.log(`   🔧 tecnico:${user.id}`)
    if (user.sedeId) {
      this.logger.log(`   🏢 sede:${user.sedeId}`)
    }
    if (user.rol === 'TECNICO' || user.rol === 'ADMIN') {
      this.logger.log(`   🎫 tickets:unassigned`)
    }
    
    // Contar conexiones activas
    this.server.sockets.sockets.size
    this.logger.log(`📊 CONEXIONES ACTIVAS: ${this.server.sockets.sockets.size}`)
  }

  handleDisconnect(client: Socket) {
    const user = client.data?.user
    const clientId = client.id
    const ip = client.handshake.address || 'Unknown'
    
    this.logger.log(`🔌 DESCONEXIÓN WEBSOCKET:`)
    this.logger.log(`   📱 Client ID: ${clientId}`)
    this.logger.log(`   🌐 IP: ${ip}`)
    
    if (user?.id) {
      this.logger.log(`👤 USUARIO DESCONECTADO:`)
      this.logger.log(`   👤 ID: ${user.id}`)
      this.logger.log(`   📧 Email: ${user.correo}`)
      this.logger.log(`   🏢 Rol: ${user.rol}`)
      this.logger.log(`   📱 Client ID: ${clientId}`)
      this.logger.log(`   🌐 IP: ${ip}`)
    } else {
      this.logger.log(`❓ DESCONEXIÓN SIN USUARIO AUTENTICADO`)
      this.logger.log(`   📱 Client ID: ${clientId}`)
      this.logger.log(`   🌐 IP: ${ip}`)
    }
    
    // Contar conexiones activas después de la desconexión
    this.logger.log(`📊 CONEXIONES ACTIVAS: ${this.server.sockets.sockets.size - 1}`)
  }
}
  