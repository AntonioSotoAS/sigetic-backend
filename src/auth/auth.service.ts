// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { UsuarioService } from '../usuario/usuario.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dni: string, password: string) {
    const usuario = await this.usuarioService.findByDni(dni)
    if (!usuario) {
      console.log('❌ Login fallido - Usuario no encontrado:', dni)
      throw new UnauthorizedException('Usuario no encontrado')
    }

    const match = await bcrypt.compare(password, usuario.password)
    if (!match) {
      console.log('❌ Login fallido - Contraseña incorrecta para:', dni)
      throw new UnauthorizedException('Contraseña incorrecta')
    }

    const payload = { 
      sub: usuario.id, 
      rol: usuario.rol,
      cargo: usuario.cargo?.nombre,
      sedeId: usuario.sede?.id,
      correo: usuario.correo
    }
    
    // Generar access token (30 días)
    const accessToken = this.jwtService.sign(payload, { expiresIn: '30d' })
    
    // Generar refresh token (7 días)
    const refreshToken = this.jwtService.sign(
      { sub: usuario.id, type: 'refresh' },
      { expiresIn: '7d' }
    )
    
    console.log('🔑 Tokens generados para:', usuario.nombres)
    
    // Retornar tokens y datos del usuario
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: usuario.id,
        nombres: usuario.nombres,
        apellidos_paterno: usuario.apellidos_paterno,
        apellidos_materno: usuario.apellidos_materno,
        correo: usuario.correo,
        dni: usuario.dni,
        telefono: usuario.telefono,
        rol: usuario.rol,
        sede: usuario.sede,
        cargo: usuario.cargo,
        foto_perfil: usuario.foto_perfil,
        activo: usuario.activo,
        password_resetada: usuario.password_resetada,
        sede_soporte: usuario.sede_soporte,
      }
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      // Verificar el refresh token
      const payload = this.jwtService.verify(refreshToken)
      
      if (payload.type !== 'refresh') {
        throw new UnauthorizedException('Token inválido')
      }

      // Obtener el usuario
      const usuario = await this.usuarioService.findById(payload.sub)
      if (!usuario) {
        throw new UnauthorizedException('Usuario no encontrado')
      }

      // Generar nuevo access token
      const newPayload = { 
        sub: usuario.id, 
        rol: usuario.rol,
        cargo: usuario.cargo?.nombre,
        sedeId: usuario.sede?.id,
        correo: usuario.correo
      }
      
      const newAccessToken = this.jwtService.sign(newPayload, { expiresIn: '30d' })

      return {
        access_token: newAccessToken,
        user: {
          id: usuario.id,
          nombres: usuario.nombres,
          apellidos_paterno: usuario.apellidos_paterno,
          apellidos_materno: usuario.apellidos_materno,
          correo: usuario.correo,
          dni: usuario.dni,
          telefono: usuario.telefono,
          rol: usuario.rol,
          sede: usuario.sede,
          cargo: usuario.cargo,
          foto_perfil: usuario.foto_perfil,
          activo: usuario.activo,
          password_resetada: usuario.password_resetada,
          sede_soporte: usuario.sede_soporte,
        }
      }
    } catch (error) {
      throw new UnauthorizedException('Token de refresco inválido')
    }
  }

  async validarUsuario(id: number) {
    return this.usuarioService.findById(id)
  }

  async resetPassword(dni: string): Promise<{ message: string; newPassword: string }> {
    console.log('🔐 RESET PASSWORD - Iniciando reset de contraseña...')
    console.log('🔐 RESET PASSWORD - DNI:', dni)

    // Buscar el usuario por DNI
    const usuario = await this.usuarioService.findByDni(dni)
    if (!usuario) {
      console.log('❌ RESET PASSWORD - Usuario no encontrado con DNI:', dni)
      throw new UnauthorizedException('Usuario no encontrado')
    }

    console.log('✅ RESET PASSWORD - Usuario encontrado:', {
      id: usuario.id,
      nombres: usuario.nombres,
      dni: usuario.dni
    })

    // Generar nueva contraseña por defecto (DNI + año actual)
    const currentYear = new Date().getFullYear()
    const newPassword = `${dni}${currentYear}`
    
    console.log('🔐 RESET PASSWORD - Nueva contraseña generada:', newPassword)

    // Encriptar la nueva contraseña
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds)
    
    console.log('🔐 RESET PASSWORD - Contraseña encriptada:', hashedPassword ? '***HASHED***' : 'NULL')

    // Actualizar la contraseña en la base de datos
    await this.usuarioService.updatePasswordByDni(dni, hashedPassword)
    
    console.log('✅ RESET PASSWORD - Contraseña actualizada exitosamente en BD')

    return { 
      message: 'Contraseña reseteada exitosamente',
      newPassword: newPassword
    }
  }

  verifyToken(token: string) {
    try {
      const payload = this.jwtService.verify(token)
      
      // Verificar que no sea un refresh token
      if (payload.type === 'refresh') {
        throw new UnauthorizedException('Refresh token no permitido')
      }
      
      return payload
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado')
    }
  }
}
