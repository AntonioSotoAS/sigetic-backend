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
import { SubcategoriaService } from './subcategoria.service'
import { CreateSubcategoriaDto } from './dto/create-subcategoria.dto'
import { UpdateSubcategoriaDto } from './dto/update-subcategoria.dto'
import { FilterSubcategoriaDto } from './dto/filter-subcategoria.dto'
import { JwtAuthGuard } from '../auth/jwt.guard'

@Controller('subcategorias')
@UseGuards(JwtAuthGuard)
export class SubcategoriaController {
  constructor(private readonly subcategoriaService: SubcategoriaService) {}

  @Post()
  create(@Body() createSubcategoriaDto: CreateSubcategoriaDto) {
    return this.subcategoriaService.create(createSubcategoriaDto)
  }

  @Get()
  findAll(@Query() filterDto: FilterSubcategoriaDto) {
    return this.subcategoriaService.findAll(filterDto)
  }

  @Get('active')
  findAllActive() {
    return this.subcategoriaService.findAllActive()
  }

  @Get('grouped')
  findAllGroupedByCategoria() {
    return this.subcategoriaService.findAllGroupedByCategoria()
  }

  @Get('categoria/:categoria_id')
  findByCategoria(@Param('categoria_id') categoria_id: string) {
    return this.subcategoriaService.findByCategoria(+categoria_id)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subcategoriaService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubcategoriaDto: UpdateSubcategoriaDto,
  ) {
    return this.subcategoriaService.update(+id, updateSubcategoriaDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subcategoriaService.delete(+id)
  }
}
