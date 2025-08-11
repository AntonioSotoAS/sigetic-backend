import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import { Dependencia } from '../../dependencia/entities/dependencia.entity'
import { Ticket } from '../../ticket/entities/ticket.entity'
import { Usuario } from '../../usuario/entities/usuario.entity'

@Entity('sedes')
export class Sede {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100 })
  nombre: string

  @Column({ length: 200, nullable: true })
  direccion: string

  @Column({ length: 20, nullable: true })
  telefono: string

  @Column({ length: 100, nullable: true })
  email: string

  @Column({ default: true })
  activo: boolean

  @OneToMany(() => Dependencia, (dependencia) => dependencia.sede)
  dependencias: Dependencia[]

  @OneToMany(() => Ticket, (ticket) => ticket.sede)
  tickets: Ticket[]

  @OneToMany(() => Usuario, (usuario) => usuario.sede)
  usuarios: Usuario[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
