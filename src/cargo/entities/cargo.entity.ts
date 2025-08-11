import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm'
import { Usuario } from '../../usuario/entities/usuario.entity'

@Entity()
export class Cargo {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nombre: string

  @Column({ default: true })
  activo: boolean

  @OneToMany(() => Usuario, (usuario) => usuario.cargo)
  usuarios: Usuario[]
}
