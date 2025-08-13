import { INestApplicationContext, Injectable, Logger } from '@nestjs/common'
import { IoAdapter } from '@nestjs/platform-socket.io'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import type { Server, Socket } from 'socket.io'

@Injectable()
export class JwtWsAdapter extends IoAdapter {
  private readonly logger = new Logger(JwtWsAdapter.name)

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
      const clientId = socket.id
      const ip = socket.handshake.address || 'Unknown'
      const userAgent = socket.handshake.headers['user-agent'] || 'Unknown'
      
      this.logger.log(`🔐 AUTENTICACIÓN WEBSOCKET:`)
      this.logger.log(`   📱 Client ID: ${clientId}`)
      this.logger.log(`   🌐 IP: ${ip}`)
      this.logger.log(`   🖥️  User Agent: ${userAgent}`)
      
      try {
        // Extraer token de múltiples fuentes
        const token =
          (socket.handshake.auth && socket.handshake.auth.token) ||
          this.extractBearer(socket.handshake.headers?.authorization as string) ||
          (socket.handshake.query?.token as string | undefined) ||
          this.extractFromCookies(socket.handshake.headers?.cookie as string)

        if (!token) {
          this.logger.warn(`❌ AUTENTICACIÓN FALLIDA - No token encontrado`)
          this.logger.warn(`   📱 Client ID: ${clientId}`)
          this.logger.warn(`   🌐 IP: ${ip}`)
          throw new Error('No token')
        }

        this.logger.log(`🔑 Token encontrado, verificando...`)

        const payload = this.jwt.verify(token, {
          secret: this.config.get<string>('JWT_SECRET'),
        })

        // Verificar que no sea un refresh token
        if (payload.type === 'refresh') {
          this.logger.warn(`❌ AUTENTICACIÓN FALLIDA - Refresh token no permitido`)
          this.logger.warn(`   📱 Client ID: ${clientId}`)
          this.logger.warn(`   🌐 IP: ${ip}`)
          throw new Error('Refresh token not allowed for WebSocket')
        }

        // Acomoda estos campos a tu payload real
        socket.data.user = {
          id: payload.sub || payload.id,
          rol: payload.rol,
          sedeId: payload.sedeId,
          correo: payload.correo,
        }
        
        this.logger.log(`✅ AUTENTICACIÓN EXITOSA:`)
        this.logger.log(`   👤 User ID: ${socket.data.user.id}`)
        this.logger.log(`   📧 Email: ${socket.data.user.correo}`)
        this.logger.log(`   🏢 Rol: ${socket.data.user.rol}`)
        this.logger.log(`   🏢 Sede ID: ${socket.data.user.sedeId || 'N/A'}`)
        this.logger.log(`   📱 Client ID: ${clientId}`)
        this.logger.log(`   🌐 IP: ${ip}`)
        
        return next()
      } catch (err) {
        this.logger.error(`❌ AUTENTICACIÓN FALLIDA - ${err.message}`)
        this.logger.error(`   📱 Client ID: ${clientId}`)
        this.logger.error(`   🌐 IP: ${ip}`)
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
