import { IsNotEmpty, IsString, Length } from 'class-validator'

export class ResetPasswordDto {
  @IsString({ message: 'El DNI debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El DNI es requerido' })
  @Length(8, 8, { message: 'El DNI debe tener exactamente 8 dígitos' })
  dni: string
} 