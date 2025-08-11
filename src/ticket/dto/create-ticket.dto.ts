import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { PrioridadTicket } from '../entities/ticket.entity'
import { ApiProperty } from '@nestjs/swagger'

export class CreateTicketDto {
  @ApiProperty({
    description: 'ID del usuario solicitante',
    example: 1
  })
  @IsNumber()
  user_id: number

  @ApiProperty({
    description: 'Título del ticket (opcional)',
    example: 'Problema con la impresora',
    required: false
  })
  @IsOptional()
  @IsString()
  titulo?: string

  @ApiProperty({
    description: 'Descripción detallada del problema (opcional)',
    example: 'La impresora no imprime y muestra error de papel',
    required: false
  })
  @IsOptional()
  @IsString()
  descripcion?: string

  @ApiProperty({
    description: 'Prioridad del ticket',
    enum: PrioridadTicket,
    example: PrioridadTicket.ALTA
  })
  @IsEnum(PrioridadTicket)
  prioridad: PrioridadTicket

  @ApiProperty({
    description: 'ID de la dependencia',
    example: 1
  })
  @IsNumber()
  dependencia_id: number

  @ApiProperty({
    description: 'ID de la sede',
    example: 1
  })
  @IsNumber()
  sede_id: number

  @ApiProperty({
    description: 'ID de la categoría (opcional)',
    example: 1,
    required: false
  })
  @IsOptional()
  @IsNumber()
  categoria_id?: number

  @ApiProperty({
    description: 'ID de la subcategoría (opcional)',
    example: 2,
    required: false
  })
  @IsOptional()
  @IsNumber()
  subcategoria_id?: number

  @ApiProperty({
    description: 'ID del técnico asignado (opcional)',
    example: 2,
    required: false
  })
  @IsOptional()
  @IsNumber()
  tecnico_id?: number
}
