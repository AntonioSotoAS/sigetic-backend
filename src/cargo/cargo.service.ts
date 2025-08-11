import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Cargo } from './entities/cargo.entity'
import { CreateCargoDto } from './dto/create-cargo.dto'
import { UpdateCargoDto } from './dto/update-cargo.dto'
import { FilterCargoDto } from './dto/filter-cargo.dto'
import { PaginatedResponse } from '../common/dtos/pagination.dto'

@Injectable()
export class CargoService {
  constructor(
    @InjectRepository(Cargo)
    private readonly repo: Repository<Cargo>,
  ) {}

  async create(dto: CreateCargoDto): Promise<Cargo> {
    const cargo = this.repo.create(dto)
    return await this.repo.save(cargo)
  }

  async findAll(filterDto: FilterCargoDto): Promise<PaginatedResponse<Cargo>> {
    const { limit = 10, offset = 0, search } = filterDto

    const query = this.repo.createQueryBuilder('cargo')
      .where('cargo.activo = true')

    // Filtro por búsqueda
    if (search) {
      query.andWhere('cargo.nombre ILIKE :search', { search: `%${search}%` })
    }

    const [data, total] = await query.take(limit).skip(offset).getManyAndCount()

    const page = Math.floor(offset / limit) + 1
    const totalPages = Math.ceil(total / limit)

    return {
      data,
      total,
      limit,
      offset,
      page,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    }
  }

  async findOne(id: number): Promise<Cargo> {
    const cargo = await this.repo.findOne({ where: { id, activo: true } })
    if (!cargo) throw new NotFoundException('Cargo no encontrado')
    return cargo
  }

  async update(id: number, dto: UpdateCargoDto): Promise<Cargo> {
    const cargo = await this.findOne(id)
    const actualizado = this.repo.merge(cargo, dto)
    return await this.repo.save(actualizado)
  }

  async delete(id: number): Promise<Cargo> {
    const cargo = await this.findOne(id)
    cargo.activo = false
    return await this.repo.save(cargo)
  }
}
