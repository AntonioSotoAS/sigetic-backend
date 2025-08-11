import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsPositive, Min } from 'class-validator'
import { Type, Transform } from 'class-transformer'

export class PaginationDto {
  @ApiProperty({
    description: 'Cantidad de resultados por página',
    default: 10,
    required: false,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number

  @ApiProperty({
    description: 'Número de página (1-based)',
    default: 1,
    required: false,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page?: number

  @ApiProperty({
    description: 'Número de registros a omitir',
    default: 0,
    required: false,
  })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  @Transform(({ value, obj }) => {
    // Si se proporciona page, calcular offset
    if (obj.page && !value) {
      return (obj.page - 1) * (obj.limit || 10)
    }
    return value
  })
  offset?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  limit: number
  offset: number
  page: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}
