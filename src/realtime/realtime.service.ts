import { Injectable, Logger } from '@nestjs/common'
import type { Server } from 'socket.io'

@Injectable()
export class RealtimeService {
  private server?: Server
  private readonly logger = new Logger(RealtimeService.name)

  setServer(server: Server) {
    this.server = server
    this.logger.log('Socket.IO server attached')
  }

  emitToSede(sedeId: number, event: string, payload: any) {
    this.server?.to(`sede:${sedeId}`).emit(event, payload)
  }

  emitToTecnico(userId: number, event: string, payload: any) {
    this.server?.to(`tecnico:${userId}`).emit(event, payload)
  }

  emitToTicket(ticketId: number, event: string, payload: any) {
    this.server?.to(`ticket:${ticketId}`).emit(event, payload)
  }

  emitToUser(userId: number, event: string, payload: any) {
    this.server?.to(`user:${userId}`).emit(event, payload)
  }

  emitToAll(event: string, payload: any) {
    this.server?.emit(event, payload)
  }
}
