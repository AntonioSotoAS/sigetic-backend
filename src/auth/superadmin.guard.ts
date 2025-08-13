import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class SuperAdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    
    try {
      // Obtener el token del header Authorization
      const authHeader = request.headers.authorization
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ForbiddenException('Token de autorización requerido')
      }

      const token = authHeader.substring(7) // Remover 'Bearer '
      
      // Verificar y decodificar el token
      const payload = this.jwtService.verify(token)
      
      // Verificar que el rol sea superadmin
      if (payload.rol !== 'superadmin') {
        console.log('❌ SUPERADMIN GUARD - Acceso denegado. Rol:', payload.rol)
        throw new ForbiddenException('Solo los superadministradores pueden acceder a este recurso')
      }

      console.log('✅ SUPERADMIN GUARD - Acceso permitido para superadmin:', payload.sub)
      return true
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error
      }
      console.log('❌ SUPERADMIN GUARD - Error al verificar token:', error.message)
      throw new ForbiddenException('Token inválido o expirado')
    }
  }
} 