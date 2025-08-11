import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { Sede } from '../../sede/entities/sede.entity'
import { Dependencia } from '../../dependencia/entities/dependencia.entity'
import { Cargo } from '../../cargo/entities/cargo.entity'
import { RolUsuario } from '../roles.enum'
import { Ticket } from '../../ticket/entities/ticket.entity'

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  correo: string

  @Column()
  nombres: string

  @Column()
  apellidos_paterno: string

  @Column()
  apellidos_materno: string

  @Column()
  dni: string

  @Column({ unique: true })
  telefono: string

  @Column()
  password: string

  @Column({
    type: 'enum',
    enum: RolUsuario,
  })
  rol: RolUsuario

  @ManyToOne(() => Sede, (sede) => sede.usuarios, { eager: true })
  @JoinColumn({ name: 'sede_id' })
  sede: Sede

  @ManyToOne(() => Dependencia, (dependencia) => dependencia.usuarios, { eager: true })
  @JoinColumn({ name: 'dependencia_id' })
  dependencia: Dependencia

  @ManyToOne(() => Cargo, { eager: true })
  @JoinColumn({ name: 'cargo_id' })
  cargo: Cargo

  @Column({ nullable: true })
  foto_perfil: string

  @Column({ default: true })
  activo: boolean

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[]

  @OneToMany(() => Ticket, (ticket) => ticket.tecnico)
  tickets_asignados: Ticket[]
}
