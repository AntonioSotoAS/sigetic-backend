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
import { LoginDto } from './dto/login.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(loginDto.correo, loginDto.password)
    
    console.log('✅ Login exitoso:', {
      correo: loginDto.correo,
      usuario: result.user.nombres,
      rol: result.user.rol,
      sede: result.user.sede?.nombre
    })
    
    // Configurar cookies según el frontend Next.js
    const isProduction = process.env.NODE_ENV === 'production'
    
    // Access token cookie (15 minutos)
    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: isProduction, // Solo HTTPS en producción
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutos
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
      maxAge: 15 * 60 * 1000, // 15 minutos
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
        maxAge: 15 * 60 * 1000,
        path: '/',
      })
      
      res.cookie('token', result.access_token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
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
}
  