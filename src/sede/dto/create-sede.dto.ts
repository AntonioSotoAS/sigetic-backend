import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateSedeDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  nombre: string

  @IsString()
  @IsNotEmpty({ message: 'La dirección es requerida' })
  direccion: string

  @IsOptional()
  @IsBoolean()
  activo?: boolean
}
