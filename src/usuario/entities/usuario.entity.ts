import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { Sede } from '../../sede/entities/sede.entity'
import { Ticket } from '../../ticket/entities/ticket.entity'
import { ComentarioTicket } from '../../comentario-ticket/entities/comentario-ticket.entity'
import { Cargo } from '../../cargo/entities/cargo.entity'
import { Dependencia } from '../../dependencia/entities/dependencia.entity'
import { RolUsuario } from '../roles.enum'

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100 })
  nombres: string

  @Column({ length: 100 })
  apellidos_paterno: string

  @Column({ length: 100 })
  apellidos_materno: string

  @Column({ unique: true, length: 100 })
  correo: string

  @Column({ length: 255 })
  password: string

  @Column({ length: 20, unique: true })
  dni: string

  @Column({ length: 20, unique: true })
  telefono: string

  @Column({ nullable: true })
  foto_perfil: string

  @Column({
    type: 'enum',
    enum: RolUsuario,
    default: RolUsuario.USUARIO
  })
  rol: RolUsuario

  @Column({ default: true })
  activo: boolean

  @Column({ default: false })
  password_resetada: boolean

  @Column('simple-array', { nullable: true })
  sede_soporte: number[]

  @ManyToOne(() => Sede, { eager: true })
  @JoinColumn({ name: 'sede_id' })
  sede: Sede

  @ManyToOne(() => Cargo, { eager: true })
  @JoinColumn({ name: 'cargo_id' })
  cargo: Cargo

  @ManyToOne(() => Dependencia, { eager: true })
  @JoinColumn({ name: 'dependencia_id' })
  dependencia: Dependencia

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[]

  @OneToMany(() => Ticket, (ticket) => ticket.tecnico)
  tickets_asignados: Ticket[]

  @OneToMany(() => ComentarioTicket, (comentario) => comentario.user)
  comentarios: ComentarioTicket[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
