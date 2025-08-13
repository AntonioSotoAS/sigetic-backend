// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Res,
  Body,
  Req,
  UseGuards,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { Response, Request } from 'express'
import { JwtAuthGuard } from './jwt.guard'
import { SuperAdminGuard } from './superadmin.guard'
import { LoginDto } from './dto/login.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(loginDto.dni, loginDto.password)
    
    console.log('✅ Login exitoso:', {
      dni: loginDto.dni,
      usuario: result.user.nombres,
      rol: result.user.rol,
      sede: result.user.sede?.nombre
    })
    
    // Configurar cookies según el frontend Next.js
    const isProduction = process.env.NODE_ENV === 'production'
    
    // Access token cookie (30 días)
    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: isProduction, // Solo HTTPS en producción
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días
      path: '/',
    })
    
    // Refresh token cookie (7 días) - si tienes refresh tokens
    if (result.refresh_token) {
      res.cookie('refresh_token', result.refresh_token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
        path: '/',
      })
    }
    
    // También mantener la cookie 'token' para compatibilidad con Socket.IO
    res.cookie('token', result.access_token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días
      sameSite: 'lax',
      secure: isProduction,
    })
    
    return { 
      message: 'Login exitoso',
      success: true,
      access_token: result.access_token,
      refresh_token: result.refresh_token,
      user: result.user
    }
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    // Limpiar todas las cookies de autenticación
    res.clearCookie('access_token', { path: '/' })
    res.clearCookie('refresh_token', { path: '/' })
    res.clearCookie('token', { path: '/' })
    
    return { 
      message: 'Sesión cerrada exitosamente',
      success: true 
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('perfil')
  @HttpCode(HttpStatus.OK)
  perfil(@Req() req: Request) {
    return {
      user: req['user'],
      success: true
    }
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.refresh_token
    
    if (!refreshToken) {
      return {
        success: false,
        message: 'Refresh token no encontrado'
      }
    }

    try {
      const result = await this.authService.refreshToken(refreshToken)
      
      // Actualizar cookies
      const isProduction = process.env.NODE_ENV === 'production'
      
      res.cookie('access_token', result.access_token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: '/',
      })
      
      res.cookie('token', result.access_token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: 'lax',
        secure: isProduction,
      })
      
      return {
        success: true,
        access_token: result.access_token,
        user: result.user
      }
    } catch (error) {
      return {
        success: false,
        message: 'Token de refresco inválido'
      }
    }
  }

  @Get('token')
  @HttpCode(HttpStatus.OK)
  async getToken(@Req() req: Request) {
    // Leer el token de las cookies httpOnly
    const accessToken = req.cookies?.access_token || req.cookies?.token
    
    if (!accessToken) {
      return {
        success: false,
        message: 'No se encontró token de autenticación',
        token: null
      }
    }

    try {
      // Verificar que el token sea válido
      const payload = this.authService.verifyToken(accessToken)
      
      return {
        success: true,
        message: 'Token obtenido exitosamente',
        token: accessToken,
        user: {
          id: payload.sub,
          rol: payload.rol,
          sedeId: payload.sedeId,
          correo: payload.correo
        }
      }
    } catch (error) {
      return {
        success: false,
        message: 'Token inválido o expirado',
        token: null
      }
    }
  }

  @Post('reset-password')
  @UseGuards(SuperAdminGuard)
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const result = await this.authService.resetPassword(resetPasswordDto.dni)
    
    console.log('✅ Reset de contraseña exitoso:', {
      dni: resetPasswordDto.dni,
      nuevaContraseña: result.newPassword
    })
    
    return {
      message: result.message,
      success: true,
      newPassword: result.newPassword
    }
  }
}
  