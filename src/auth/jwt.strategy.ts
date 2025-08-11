// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Request } from 'express'
import { UsuarioService } from '../usuario/usuario.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usuarioService: UsuarioService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // Extraer de cookies (prioridad para Next.js)
        (req: Request) => {
          console.log('🍪 JWT Strategy - Cookies recibidas:', req?.cookies)
          const token = req?.cookies?.access_token || req?.cookies?.token
          console.log('🔑 JWT Strategy - Token extraído:', token ? 'SÍ' : 'NO')
          return token
        },
        // Extraer de header Authorization (para compatibilidad)
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        // Extraer de query parameter (para Socket.IO)
        ExtractJwt.fromUrlQueryParameter('token'),
      ]),
      secretOrKey: process.env.JWT_SECRET!,
    })
  }

  async validate(payload: any) {
    console.log('🔍 JWT Strategy - Payload recibido:', payload)
    
    // Verificar que no sea un refresh token
    if (payload.type === 'refresh') {
      console.log('❌ JWT Strategy - Es un refresh token, rechazando')
      return null
    }

    // Obtener usuario completo desde la base de datos
    const usuario = await this.usuarioService.findById(payload.sub)
    if (!usuario) {
      console.log('❌ JWT Strategy - Usuario no encontrado en BD:', payload.sub)
      return null
    }
    
    console.log('✅ JWT Strategy - Usuario validado:', usuario.nombres)
    
    // Agregar información adicional al payload
    return {
      ...usuario,
      sedeId: usuario.sede?.id,
    }
  }
}
