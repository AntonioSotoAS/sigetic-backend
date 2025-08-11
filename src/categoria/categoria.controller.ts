import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common'
import { CategoriaService } from './categoria.service'
import { CreateCategoriaDto } from './dto/create-categoria.dto'
import { UpdateCategoriaDto } from './dto/update-categoria.dto'
import { FilterCategoriaDto } from './dto/filter-categoria.dto'
import { JwtAuthGuard } from '../auth/jwt.guard'
import { GetUser } from '../common/decorators/get-user.decorator'
import { Usuario } from '../usuario/entities/usuario.entity'
import { RolUsuario } from '../usuario/roles.enum'

@Controller('categorias')
@UseGuards(JwtAuthGuard)
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaService.create(createCategoriaDto)
  }

  @Get()
  findAll(@Query() filterDto: FilterCategoriaDto) {
    return this.categoriaService.findAll(filterDto)
  }

  @Get('active')
  findAllActive() {
    return this.categoriaService.findAllActive()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriaService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.categoriaService.update(+id, updateCategoriaDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriaService.delete(+id)
  }
}
