import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator'

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty({ message: 'La contraseña actual es requerida' })
  password_actual: string

  @IsString()
  @IsNotEmpty({ message: 'La nueva contraseña es requerida' })
  @MinLength(6, { message: 'La nueva contraseña debe tener al menos 6 caracteres' })
  @MaxLength(50, { message: 'La nueva contraseña no puede exceder 50 caracteres' })
  password_nuevo: string
} 