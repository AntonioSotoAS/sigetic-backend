import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateDependenciaDto {
  @ApiProperty({
    description: 'Nombre de la dependencia',
    example: 'Departamento de IT'
  })
  @IsString()
  nombre: string

  @ApiProperty({
    description: 'Descripción de la dependencia',
    example: 'Departamento encargado de la tecnología de la información',
    required: false
  })
  @IsOptional()
  @IsString()
  descripcion?: string

  @ApiProperty({
    description: 'Estado activo de la dependencia',
    example: true,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  activo?: boolean

  @ApiProperty({
    description: 'ID de la sede a la que pertenece la dependencia',
    example: 1,
    required: true
  })
  @IsNumber()
  sede_id: number
}
