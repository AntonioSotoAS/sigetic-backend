import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  ParseIntPipe,
  UseGuards,
  ForbiddenException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { DependenciaService } from './dependencia.service'
import { JwtAuthGuard } from '../auth/jwt.guard'
import { CreateDependenciaDto } from './dto/create-dependencia.dto'
import { UpdateDependenciaDto } from './dto/update-dependencia.dto'
import { FilterDependenciaDto } from './dto/filter-dependencia.dto'
import { GetUser } from '../common/decorators/get-user.decorator'
import { Usuario } from '../usuario/entities/usuario.entity'
import { RolUsuario } from '../usuario/roles.enum'
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger'

@ApiTags('Dependencias')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('dependencias')
export class DependenciaController {
  constructor(private readonly dependenciaService: DependenciaService) {}

  @Get()
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'activo', required: false })
  findAll(
    @Query() filters: FilterDependenciaDto,
    @GetUser() user: Usuario,
  ) {
    return this.dependenciaService.findAll(filters, user)
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: Usuario,
  ) {
    return this.dependenciaService.findOne(id, user)
  }

  @Get('sede/:sedeId')
  findBySede(
    @Param('sedeId', ParseIntPipe) sedeId: number,
    @GetUser() user: Usuario,
  ) {
    return this.dependenciaService.findBySede(sedeId)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createDependenciaDto: CreateDependenciaDto,
    @GetUser() user: Usuario,
  ) {
    // Solo superadmin puede crear dependencias
    if (user.rol !== RolUsuario.SUPERADMIN) {
      throw new ForbiddenException('Solo el superadmin puede crear dependencias')
    }
    return this.dependenciaService.create(createDependenciaDto)
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDependenciaDto: UpdateDependenciaDto,
    @GetUser() user: Usuario,
  ) {
    // Solo superadmin puede actualizar dependencias
    if (user.rol !== RolUsuario.SUPERADMIN) {
      throw new ForbiddenException('Solo el superadmin puede actualizar dependencias')
    }
    return this.dependenciaService.update(id, updateDependenciaDto)
  }

  @Patch(':id')
  partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDependenciaDto: UpdateDependenciaDto,
    @GetUser() user: Usuario,
  ) {
    // Solo superadmin puede actualizar dependencias
    if (user.rol !== RolUsuario.SUPERADMIN) {
      throw new ForbiddenException('Solo el superadmin puede actualizar dependencias')
    }
    return this.dependenciaService.update(id, updateDependenciaDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: Usuario,
  ) {
    // Solo superadmin puede eliminar dependencias
    if (user.rol !== RolUsuario.SUPERADMIN) {
      throw new ForbiddenException('Solo el superadmin puede eliminar dependencias')
    }
    return this.dependenciaService.remove(id)
  }

  @Delete(':id/permanent')
  @HttpCode(HttpStatus.OK)
  hardRemove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: Usuario,
  ) {
    // Solo superadmin puede eliminar permanentemente
    if (user.rol !== RolUsuario.SUPERADMIN) {
      throw new ForbiddenException('Solo el superadmin puede eliminar permanentemente')
    }
    return this.dependenciaService.hardRemove(id)
  }
}
