import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Ticket } from '../../ticket/entities/ticket.entity'
import { Usuario } from '../../usuario/entities/usuario.entity'

export enum TipoComentario {
  INTERNO = 'interno',
  PUBLICO = 'publico',
}

@Entity()
export class ComentarioTicket {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Ticket, (ticket) => ticket.comentarios_ticket)
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'user_id' })
  user: Usuario

  @Column('text')
  comentario: string

  @Column({
    type: 'enum',
    enum: TipoComentario,
    default: TipoComentario.PUBLICO,
  })
  tipo: TipoComentario

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
