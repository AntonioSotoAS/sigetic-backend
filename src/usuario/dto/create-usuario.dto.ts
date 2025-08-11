import { IsBoolean, IsEmail, IsEnum, IsNumber, IsOptional, IsString, Length } from 'class-validator'
import { RolUsuario } from '../roles.enum'

export class CreateUsuarioDto {
  @IsEmail()
  correo: string

  @IsString()
  nombres: string

  @IsString()
  apellidos_paterno: string

  @IsString()
  apellidos_materno: string

  @IsString()
  @Length(8, 8, { message: 'El DNI debe tener 8 caracteres' })
  dni: string

  @IsString()
  telefono: string

  @IsString()
  password: string

  @IsEnum(RolUsuario)
  rol: RolUsuario

  @IsOptional()
  @IsString()
  foto_perfil?: string

  @IsOptional()
  @IsBoolean()
  activo?: boolean

  @IsOptional()
  sede_id?: number

  @IsOptional()
  @IsNumber()
  dependencia_id?: number

  @IsOptional()
  @IsNumber()
  cargo_id?: number
}
