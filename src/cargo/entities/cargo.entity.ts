import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Cargo {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nombre: string

  @Column({ default: true })
  activo: boolean
}
