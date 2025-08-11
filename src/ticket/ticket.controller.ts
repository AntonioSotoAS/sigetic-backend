import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common'
import { TicketService } from './ticket.service'
import { CreateTicketDto } from './dto/create-ticket.dto'
import { UpdateTicketDto } from './dto/update-ticket.dto'
import { FilterTicketDto } from './dto/filter-ticket.dto'
import { JwtAuthGuard } from '../auth/jwt.guard'
import { GetUser } from '../common/decorators/get-user.decorator'
import { Usuario } from '../usuario/entities/usuario.entity'

@Controller('tickets')
@UseGuards(JwtAuthGuard)
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto, @GetUser() user: Usuario) {
    return this.ticketService.create(createTicketDto, user)
  }

  @Get()
  findAll(@Query() filterDto: FilterTicketDto, @GetUser() user: Usuario) {
    return this.ticketService.findAll(filterDto, user)
  }

  @Get('sin-asignar')
  findSinAsignar(@GetUser() user: Usuario) {
    return this.ticketService.findSinAsignar(user)
  }

  @Get('sin-asignar-mi-sede')
  findSinAsignarMiSede(@GetUser() user: Usuario) {
    return this.ticketService.findSinAsignarMiSede(user)
  }

  @Get('mis-tickets')
  findMisTickets(@GetUser() user: Usuario) {
    return this.ticketService.findMisTickets(user)
  }

  @Get('asignados/:tecnicoId')
  findTicketsAsignados(@Param('tecnicoId') tecnicoId: string, @GetUser() user: Usuario) {
    return this.ticketService.findTicketsAsignados(+tecnicoId, user)
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: Usuario) {
    return this.ticketService.findOne(+id, user)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
    @GetUser() user: Usuario,
  ) {
    return this.ticketService.update(+id, updateTicketDto, user)
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: Usuario) {
    return this.ticketService.delete(+id, user)
  }
}
