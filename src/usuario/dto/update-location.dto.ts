import { IsNumber, IsOptional } from 'class-validator'

export class UpdateLocationDto {
  @IsNumber({}, { message: 'El ID de la sede debe ser un número' })
  @IsOptional()
  sede_id?: number

  @IsNumber({}, { message: 'El ID de la dependencia debe ser un número' })
  @IsOptional()
  dependencia_id?: number
} 