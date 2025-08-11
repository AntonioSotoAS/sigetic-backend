import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Usuario } from '../../usuario/entities/usuario.entity'
import { Dependencia } from '../../dependencia/entities/dependencia.entity'
import { Sede } from '../../sede/entities/sede.entity'
import { Categoria } from '../../categoria/entities/categoria.entity'
import { Subcategoria } from '../../subcategoria/entities/subcategoria.entity'
import { ComentarioTicket } from '../../comentario-ticket/entities/comentario-ticket.entity'

export enum PrioridadTicket {
  BAJA = 'baja',
  MEDIA = 'media',
  ALTA = 'alta',
  URGENTE = 'urgente',
}

export enum EstadoTicket {
  PENDIENTE = 'pendiente',
  ASIGNADO = 'asignado',
  EN_PROCESO = 'en_proceso',
  RESUELTO = 'resuelto',
  CERRADO = 'cerrado',
}

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { nullable: true })
  titulo: string | null

  @Column('text', { nullable: true })
  descripcion: string | null

  @Column({
    type: 'enum',
    enum: PrioridadTicket,
  })
  prioridad: PrioridadTicket

  @Column({
    type: 'enum',
    enum: EstadoTicket,
    default: EstadoTicket.PENDIENTE,
  })
  estado: EstadoTicket

  @ManyToOne(() => Usuario, (usuario) => usuario.tickets)
  @JoinColumn({ name: 'user_id' })
  user: Usuario

  @ManyToOne(() => Dependencia, (dependencia) => dependencia.tickets)
  @JoinColumn({ name: 'dependencia_id' })
  dependencia: Dependencia

  @ManyToOne(() => Sede, (sede) => sede.tickets)
  @JoinColumn({ name: 'sede_id' })
  sede: Sede

  @ManyToOne(() => Categoria, { nullable: true })
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria | null

  @ManyToOne(() => Subcategoria, { nullable: true })
  @JoinColumn({ name: 'subcategoria_id' })
  subcategoria: Subcategoria | null

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'tecnico_id' })
  tecnico: Usuario | null

  @Column('datetime', { nullable: true })
  fecha_asignacion: Date | null

  @Column('datetime', { nullable: true })
  fecha_resolucion: Date | null

  @Column('datetime', { nullable: true })
  fecha_cierre: Date | null

  @OneToMany(() => ComentarioTicket, (comentario) => comentario.ticket)
  comentarios_ticket: ComentarioTicket[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
