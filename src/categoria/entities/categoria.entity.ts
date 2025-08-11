import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm'
import { Subcategoria } from '../../subcategoria/entities/subcategoria.entity'

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nombre: string

  @Column({ default: true })
  activo: boolean

  @OneToMany(() => Subcategoria, (subcategoria) => subcategoria.categoria)
  subcategorias: Subcategoria[]
}
