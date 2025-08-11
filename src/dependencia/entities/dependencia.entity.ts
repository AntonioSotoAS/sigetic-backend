import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Usuario } from '../../usuario/entities/usuario.entity'
import { Ticket } from '../../ticket/entities/ticket.entity'
import { Sede } from '../../sede/entities/sede.entity'

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

  @ManyToOne(() => Sede, (sede) => sede.dependencias, { eager: true })
  @JoinColumn({ name: 'sede_id' })
  sede: Sede
 
  @OneToMany(() => Usuario, (usuario) => usuario.dependencia)
  usuarios: Usuario[]

  @OneToMany(() => Ticket, (ticket) => ticket.dependencia)
  tickets: Ticket[]
}
