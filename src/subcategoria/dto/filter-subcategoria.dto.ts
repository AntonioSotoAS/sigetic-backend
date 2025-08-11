import { IsNumber, IsOptional, IsString } from 'class-validator'
import { PaginationDto } from '../../common/dtos/pagination.dto'

export class FilterSubcategoriaDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string

  @IsOptional()
  @IsNumber()
  categoria_id?: number
}
