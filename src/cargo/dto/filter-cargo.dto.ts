import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { PaginationDto } from '../../common/dtos/pagination.dto'

export class FilterCargoDto extends PaginationDto {
  @ApiProperty({
    description: 'Término de búsqueda (nombre)',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string
}
