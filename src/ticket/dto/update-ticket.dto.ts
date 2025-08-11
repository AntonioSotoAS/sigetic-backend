import { IsEnum, IsNumber, IsOptional, IsString, IsDateString } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'
import { CreateTicketDto } from './create-ticket.dto'
import { EstadoTicket } from '../entities/ticket.entity'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  @ApiProperty({
    description: 'Estado del ticket',
    enum: EstadoTicket,
    required: false
  })
  @IsOptional()
  @IsEnum(EstadoTicket)
  estado?: EstadoTicket

  @ApiProperty({
    description: 'ID del técnico asignado',
    example: 2,
    required: false
  })
  @IsOptional()
  @IsNumber()
  tecnico_id?: number

  @ApiProperty({
    description: 'Comentario interno del técnico',
    example: 'Ticket asignado para revisión',
    required: false
  })
  @IsOptional()
  @IsString()
  comentario_interno?: string

  @ApiProperty({
    description: 'Fecha de asignación del ticket',
    example: '2024-01-15T10:30:00Z',
    required: false
  })
  @IsOptional()
  @IsDateString()
  fecha_asignacion?: string

  @ApiProperty({
    description: 'Fecha de resolución del ticket',
    example: '2024-01-16T14:45:00Z',
    required: false
  })
  @IsOptional()
  @IsDateString()
  fecha_resolucion?: string

  @ApiProperty({
    description: 'Fecha de cierre del ticket',
    example: '2024-01-17T09:00:00Z',
    required: false
  })
  @IsOptional()
  @IsDateString()
  fecha_cierre?: string
}
