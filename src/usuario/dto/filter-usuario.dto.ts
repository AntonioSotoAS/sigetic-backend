import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, IsEnum, IsNumber, IsBoolean } from 'class-validator'
import { RolUsuario } from '../roles.enum'
import { PaginationDto } from '../../common/dtos/pagination.dto'

export class FilterUsuarioDto extends PaginationDto {
  @ApiProperty({
    description: 'Término de búsqueda (nombre, correo, dni, teléfono)',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string

  @ApiProperty({
    description: 'Filtrar por rol',
    enum: RolUsuario,
    required: false,
  })
  @IsOptional()
  @IsEnum(RolUsuario)
  rol?: RolUsuario

  @ApiProperty({
    description: 'Filtrar por sede',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  sede_id?: number

  @ApiProperty({
    description: 'Filtrar por dependencia',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  dependencia_id?: number

  @ApiProperty({
    description: 'Filtrar por cargo',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  cargo_id?: number

  @ApiProperty({
    description: 'Filtrar por estado activo',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  activo?: boolean
} 