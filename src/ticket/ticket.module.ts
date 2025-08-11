import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TicketService } from './ticket.service'
import { TicketController } from './ticket.controller'
import { Ticket } from './entities/ticket.entity'
import { Usuario } from '../usuario/entities/usuario.entity'
import { Dependencia } from '../dependencia/entities/dependencia.entity'
import { Sede } from '../sede/entities/sede.entity'
import { Categoria } from '../categoria/entities/categoria.entity'
import { Subcategoria } from '../subcategoria/entities/subcategoria.entity'
import { ComentarioTicket } from '../comentario-ticket/entities/comentario-ticket.entity'
import { RealtimeModule } from '../realtime/realtime.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Ticket,
      Usuario,
      Dependencia,
      Sede,
      Categoria,
      Subcategoria,
      ComentarioTicket,
    ]),
    RealtimeModule,
  ],
  controllers: [TicketController],
  providers: [TicketService],
  exports: [TicketService],
})
export class TicketModule {}
