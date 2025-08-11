import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common'
import { CargoService } from './cargo.service'
import { CreateCargoDto } from './dto/create-cargo.dto'
import { UpdateCargoDto } from './dto/update-cargo.dto'
import { FilterCargoDto } from './dto/filter-cargo.dto'
import { JwtAuthGuard } from '../auth/jwt.guard'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('Cargos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cargos')
export class CargoController {
  constructor(private readonly cargoService: CargoService) {}

  @Post()
  create(@Body() createCargoDto: CreateCargoDto) {
    return this.cargoService.create(createCargoDto)
  }

  @Get()
  findAll(@Query() filterDto: FilterCargoDto) {
    return this.cargoService.findAll(filterDto)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cargoService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCargoDto: UpdateCargoDto) {
    return this.cargoService.update(id, updateCargoDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cargoService.delete(id)
  }
}
