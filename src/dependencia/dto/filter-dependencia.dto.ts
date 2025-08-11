import { IsOptional, IsString, IsBoolean } from 'class-validator'
import { Transform } from 'class-transformer'
import { PaginationDto } from '../../common/dtos/pagination.dto'

export class FilterDependenciaDto extends PaginationDto {
  @IsOptional()
  @Transform(({ value }) => {
    // Si search está vacío o es undefined, retornar undefined
    if (value === '' || value === undefined || value === null) {
      return undefined;
    }
    return value;
  })
  @IsString()
  search?: string

  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true
    if (value === 'false' || value === false) return false
    return undefined
  })
  @IsBoolean()
  activo?: boolean
}
