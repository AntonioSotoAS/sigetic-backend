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
  import { JwtAuthGuard } from 'src/auth/jwt.guard'
  import { GetUser } from '../common/decorators/get-user.decorator'
  import { Usuario } from './entities/usuario.entity'
  import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger'
  
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
  
    @Get(':id')
    findOne(
      @Param('id', ParseIntPipe) id: number,
      @GetUser() user: Usuario,
    ) {
      return this.usuarioService.findOne(id, user)
    }
  
    @Post()
    create(
      @Body() dto: CreateUsuarioDto,
    ) {
      return this.usuarioService.create(dto)
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
  