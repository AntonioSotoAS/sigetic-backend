import { IsOptional, IsString } from 'class-validator'
import { PaginationDto } from '../../common/dtos/pagination.dto'

export class FilterCategoriaDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string
}
