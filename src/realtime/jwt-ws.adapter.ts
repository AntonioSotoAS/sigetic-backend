import { INestApplicationContext, Injectable } from '@nestjs/common'
import { IoAdapter } from '@nestjs/platform-socket.io'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import type { Server, Socket } from 'socket.io'

@Injectable()
export class JwtWsAdapter extends IoAdapter {
  constructor(
    app: INestApplicationContext,
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {
    super(app)
  }

  createIOServer(port: number, options?: any): Server {
    const server: Server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: ['http://localhost:3000'], // ajusta en prod
        credentials: true,
      },
    })

    server.use((socket: Socket, next) => {
      try {
        // Extraer token de múltiples fuentes
        const token =
          (socket.handshake.auth && socket.handshake.auth.token) ||
          this.extractBearer(socket.handshake.headers?.authorization as string) ||
          (socket.handshake.query?.token as string | undefined) ||
          this.extractFromCookies(socket.handshake.headers?.cookie as string)

        if (!token) throw new Error('No token')

        const payload = this.jwt.verify(token, {
          secret: this.config.get<string>('JWT_SECRET'),
        })

        // Verificar que no sea un refresh token
        if (payload.type === 'refresh') {
          throw new Error('Refresh token not allowed for WebSocket')
        }

        // Acomoda estos campos a tu payload real
        socket.data.user = {
          id: payload.sub || payload.id,
          rol: payload.rol,
          sedeId: payload.sedeId,
          correo: payload.correo,
        }
        return next()
      } catch (err) {
        return next(new Error('Unauthorized'))
      }
    })

    return server
  }

  private extractFromCookies(cookieHeader?: string) {
    if (!cookieHeader) return null
    
    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=')
      acc[key] = value
      return acc
    }, {} as Record<string, string>)
    
    // Buscar access_token primero, luego token
    return cookies.access_token || cookies.token
  }

  private extractBearer(authorization?: string) {
    if (!authorization) return null
    const [type, value] = authorization.split(' ')
    return type?.toLowerCase() === 'bearer' ? value : null
  }
}
