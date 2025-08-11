import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SeedService } from './seed.service'
import { SeedController } from './seed.controller'
import { Usuario } from '../usuario/entities/usuario.entity'
import { Sede } from '../sede/entities/sede.entity'
import { Cargo } from '../cargo/entities/cargo.entity'
import { Dependencia } from '../dependencia/entities/dependencia.entity'
import { Categoria } from '../categoria/entities/categoria.entity'
import { Subcategoria } from '../subcategoria/entities/subcategoria.entity'
import { Ticket } from '../ticket/entities/ticket.entity'
import { ComentarioTicket } from '../comentario-ticket/entities/comentario-ticket.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario,
      Sede,
      Cargo,
      Dependencia,
      Categoria,
      Subcategoria,
      Ticket,
      ComentarioTicket,
    ]),
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {} 