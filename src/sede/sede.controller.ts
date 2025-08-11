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
import { SedeService } from './sede.service'
import { JwtAuthGuard } from '../auth/jwt.guard'
import { CreateSedeDto } from './dto/create-sede.dto'
import { UpdateSedeDto } from './dto/update-sede.dto'
import { FilterSedeDto } from './dto/filter-sede.dto'
import { GetUser } from '../common/decorators/get-user.decorator'
import { Usuario } from '../usuario/entities/usuario.entity'
import { RolUsuario } from '../usuario/roles.enum'
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger'

@ApiTags('Sedes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('sedes')
export class SedeController {
  constructor(private readonly sedeService: SedeService) {}

  @Get()
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'activo', required: false })
  findAll(
    @Query() filters: FilterSedeDto,
    @GetUser() user: Usuario,
  ) {
    return this.sedeService.findAll(filters, user)
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: Usuario,
  ) {
    return this.sedeService.findOne(id, user)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createSedeDto: CreateSedeDto,
    @GetUser() user: Usuario,
  ) {
    // Solo superadmin puede crear sedes
    if (user.rol !== RolUsuario.SUPERADMIN) {
      throw new ForbiddenException('Solo el superadmin puede crear sedes')
    }
    return this.sedeService.create(createSedeDto)
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSedeDto: UpdateSedeDto,
    @GetUser() user: Usuario,
  ) {
    // Solo superadmin puede actualizar sedes
    if (user.rol !== RolUsuario.SUPERADMIN) {
      throw new ForbiddenException('Solo el superadmin puede actualizar sedes')
    }
    return this.sedeService.update(id, updateSedeDto)
  }

  @Patch(':id')
  partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSedeDto: UpdateSedeDto,
    @GetUser() user: Usuario,
  ) {
    // Solo superadmin puede actualizar sedes
    if (user.rol !== RolUsuario.SUPERADMIN) {
      throw new ForbiddenException('Solo el superadmin puede actualizar sedes')
    }
    return this.sedeService.update(id, updateSedeDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: Usuario,
  ) {
    // Solo superadmin puede eliminar sedes
    if (user.rol !== RolUsuario.SUPERADMIN) {
      throw new ForbiddenException('Solo el superadmin puede eliminar sedes')
    }
    return this.sedeService.remove(id)
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
    return this.sedeService.hardRemove(id)
  }
}
