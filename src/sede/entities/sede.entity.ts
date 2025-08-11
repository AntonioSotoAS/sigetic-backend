import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm'
import { Usuario } from '../../usuario/entities/usuario.entity'
import { Ticket } from '../../ticket/entities/ticket.entity'

@Entity()
export class Sede {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nombre: string

  @Column('text', { nullable: true })
  direccion: string

  @Column()
  ciudad: string

  @Column({ default: true })
  activo: boolean

  @OneToMany(() => Usuario, (usuario) => usuario.sede)
  usuarios: Usuario[]

  @OneToMany(() => Ticket, (ticket) => ticket.sede)
  tickets: Ticket[]
}
