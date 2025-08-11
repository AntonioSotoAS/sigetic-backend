import { IsEnum, IsOptional, IsString, IsNumber } from 'class-validator'
import { PaginationDto } from '../../common/dtos/pagination.dto'
import { EstadoTicket, PrioridadTicket } from '../entities/ticket.entity'

export class FilterTicketDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string

  @IsOptional()
  @IsEnum(EstadoTicket)
  estado?: EstadoTicket

  @IsOptional()
  @IsEnum(PrioridadTicket)
  prioridad?: PrioridadTicket

  @IsOptional()
  @IsNumber()
  categoria_id?: number

  @IsOptional()
  @IsNumber()
  subcategoria_id?: number

  @IsOptional()
  @IsNumber()
  dependencia_id?: number

  @IsOptional()
  @IsNumber()
  sede_id?: number

  @IsOptional()
  @IsNumber()
  tecnico_id?: number

  @IsOptional()
  @IsNumber()
  user_id?: number
}
