import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm'
import { Usuario } from '../../usuario/entities/usuario.entity'
import { Ticket } from '../../ticket/entities/ticket.entity'

@Entity()
export class Dependencia {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nombre: string

  @Column('text', { nullable: true })
  descripcion: string

  @Column({ default: true })
  activo: boolean

  @OneToMany(() => Usuario, (usuario) => usuario.dependencia)
  usuarios: Usuario[]

  @OneToMany(() => Ticket, (ticket) => ticket.dependencia)
  tickets: Ticket[]
}
