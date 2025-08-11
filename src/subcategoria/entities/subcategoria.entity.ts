import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Categoria } from '../../categoria/entities/categoria.entity'

@Entity()
export class Subcategoria {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nombre: string

  @Column({ default: true })
  activo: boolean

  @ManyToOne(() => Categoria, (categoria) => categoria.subcategorias, { eager: true })
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria
}
