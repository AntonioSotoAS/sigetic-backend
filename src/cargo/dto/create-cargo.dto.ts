import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateCargoDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  nombre: string

  @IsOptional()
  @IsBoolean()
  activo?: boolean
}
