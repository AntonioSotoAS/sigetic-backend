import { IsBoolean, IsEmail, IsEnum, IsNumber, IsOptional, IsString, Length, IsArray } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { RolUsuario } from '../roles.enum'

export class CreateUsuarioDto {
  @ApiProperty({
    description: 'Nombres del usuario',
    example: 'Juan Carlos',
    required: true
  })
  @IsString()
  @Length(2, 100)
  nombres: string

  @ApiProperty({
    description: 'Apellido paterno del usuario',
    example: 'García',
    required: true
  })
  @IsString()
  @Length(2, 100)
  apellidos_paterno: string

  @ApiProperty({
    description: 'Apellido materno del usuario',
    example: 'López',
    required: true
  })
  @IsString()
  @Length(2, 100)
  apellidos_materno: string

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'usuario@ejemplo.com',
    required: true
  })
  @IsEmail()
  correo: string

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: '123456',
    required: true
  })
  @IsString()
  @Length(6, 50)
  password: string

  @ApiProperty({
    description: 'DNI del usuario',
    example: '12345678',
    required: true
  })
  @IsString()
  @Length(8, 20)
  dni: string

  @ApiProperty({
    description: 'Teléfono del usuario',
    example: '999888777',
    required: true
  })
  @IsString()
  @Length(9, 20)
  telefono: string

  @ApiProperty({
    description: 'Rol del usuario',
    enum: RolUsuario,
    example: RolUsuario.USUARIO,
    required: true
  })
  @IsEnum(RolUsuario)
  rol: RolUsuario

  @ApiProperty({
    description: 'ID de la sede a la que pertenece el usuario',
    example: 1,
    required: true
  })
  @IsNumber()
  sede_id: number

  @ApiProperty({
    description: 'ID del cargo del usuario',
    example: 1,
    required: true
  })
  @IsNumber()
  cargo_id: number

  @ApiProperty({
    description: 'ID de la dependencia del usuario',
    example: 1,
    required: true
  })
  @IsNumber()
  dependencia_id: number

  @ApiProperty({
    description: 'URL de la foto de perfil del usuario',
    example: 'https://ejemplo.com/foto.jpg',
    required: false
  })
  @IsOptional()
  @IsString()
  foto_perfil?: string

  @ApiProperty({
    description: 'Estado activo del usuario',
    example: true,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  activo?: boolean

  @ApiProperty({
    description: 'Indica si la contraseña ha sido resetada',
    example: false,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  password_resetada?: boolean

  @ApiProperty({
    description: 'Array de IDs de sedes de soporte asignadas al usuario',
    example: [1, 2, 3],
    type: [Number],
    required: false
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  sede_soporte?: number[]
}
