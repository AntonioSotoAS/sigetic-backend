import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, IsEnum } from 'class-validator'
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
} 