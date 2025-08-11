import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateSubcategoriaDto {
  @IsString()
  nombre: string

  @IsOptional()
  @IsBoolean()
  activo?: boolean

  @IsNumber()
  categoria_id: number
}
