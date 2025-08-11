import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Query,
    Body,
    ParseIntPipe,
    UseGuards,
  } from '@nestjs/common'
  import { UsuarioService } from './usuario.service'
  import { CreateUsuarioDto } from './dto/create-usuario.dto'
  import { UpdateUsuarioDto } from './dto/update-usuario.dto'
  import { FilterUsuarioDto } from './dto/filter-usuario.dto'
  import { UpdatePasswordDto } from './dto/update-password.dto'
import { JwtAuthGuard } from '../auth/jwt.guard'
import { GetUser } from '../common/decorators/get-user.decorator'
import { Usuario } from './entities/usuario.entity'
import { ApiBearerAuth, ApiQuery, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
  
  @ApiTags('Usuarios')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Controller('usuarios')
  export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}
  
        @Get()
    @ApiQuery({ name: 'limit', required: false })
    @ApiQuery({ name: 'offset', required: false })
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'search', required: false })
    @ApiQuery({ name: 'rol', required: false })
    findAll(
      @Query() filterDto: FilterUsuarioDto,
      @GetUser() user: Usuario,
    ) {
      return this.usuarioService.findAll(filterDto, user)
    }

    @Post()
    create(
      @Body() dto: CreateUsuarioDto,
    ) {
      return this.usuarioService.create(dto)
    }

    @Patch('update-password')
    @ApiOperation({ summary: 'Actualizar contraseña del usuario autenticado' })
    @ApiResponse({ 
      status: 200, 
      description: 'Contraseña actualizada exitosamente',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Contraseña actualizada exitosamente' }
        }
      }
    })
    @ApiResponse({ status: 400, description: 'Contraseña actual incorrecta o nueva contraseña inválida' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    updatePassword(
      @Body() dto: UpdatePasswordDto,
      @GetUser() user: Usuario,
    ) {
      console.log('🔐 CONTROLLER - updatePassword llamado')
      console.log('🔐 CONTROLLER - User:', {
        id: user.id,
        nombres: user.nombres,
        correo: user.correo
      })
      console.log('🔐 CONTROLLER - DTO recibido:', {
        password_actual: dto.password_actual ? '***PROVIDED***' : 'NOT_PROVIDED',
        password_nuevo: dto.password_nuevo ? '***PROVIDED***' : 'NOT_PROVIDED'
      })
      
      return this.usuarioService.updatePassword(user.id, dto)
    }

    @Get('sedes-soporte')
    @ApiOperation({ summary: 'Obtener sedes de soporte asignadas al usuario autenticado' })
    @ApiResponse({ status: 200, description: 'Lista de IDs de sedes de soporte' })
    getSedesSoporte(@GetUser() user: Usuario) {
      return this.usuarioService.getSedesSoporte(user.id)
    }

    @Post(':id/assign-sedes-soporte')
    @ApiOperation({ summary: 'Asignar sedes de soporte a un usuario específico' })
    @ApiResponse({ status: 200, description: 'Sedes de soporte asignadas exitosamente' })
    @ApiResponse({ status: 400, description: 'Usuario no puede tener múltiples sedes de soporte' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    assignSedesSoporte(
      @Param('id', ParseIntPipe) id: number,
      @Body() body: { sede_ids: number[] },
    ) {
      return this.usuarioService.assignSedesSoporte(id, body.sede_ids)
    }

    @Get(':id')
    findOne(
      @Param('id', ParseIntPipe) id: number,
      @GetUser() user: Usuario,
    ) {
      return this.usuarioService.findOne(id, user)
    }

    @Patch(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: UpdateUsuarioDto,
      @GetUser() user: Usuario,
    ) {
      return this.usuarioService.update(id, dto, user)
    }

    @Delete(':id')
    remove(
      @Param('id', ParseIntPipe) id: number,
      @GetUser() user: Usuario,
    ) {
      return this.usuarioService.delete(id, user)
    }

    @Get(':id/roles-visibles')
    getRolesVisibles(
      @Param('id', ParseIntPipe) id: number,
    ) {
      return this.usuarioService.getRol(id)
    }
  }
  