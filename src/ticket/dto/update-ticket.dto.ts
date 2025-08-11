import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'
import { CreateTicketDto } from './create-ticket.dto'
import { EstadoTicket } from '../entities/ticket.entity'

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  @IsOptional()
  @IsEnum(EstadoTicket)
  estado?: EstadoTicket

  @IsOptional()
  @IsNumber()
  tecnico_id?: number

  @IsOptional()
  @IsString()
  comentario_interno?: string
}
