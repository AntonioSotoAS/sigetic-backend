import {
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Categoria } from './entities/categoria.entity'
import { CreateCategoriaDto } from './dto/create-categoria.dto'
import { UpdateCategoriaDto } from './dto/update-categoria.dto'
import { FilterCategoriaDto } from './dto/filter-categoria.dto'
import { PaginatedResponse } from '../common/dtos/pagination.dto'

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly repo: Repository<Categoria>,
  ) {}

  // ✅ Listado paginado con filtros
  async findAll(filterDto: FilterCategoriaDto): Promise<PaginatedResponse<Categoria>> {
    const { limit = 10, offset = 0, search } = filterDto

    const query = this.repo.createQueryBuilder('categoria')
      .where('categoria.activo = true')

    // Filtro por búsqueda
    if (search) {
      query.andWhere('categoria.nombre ILIKE :search', { search: `%${search}%` })
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

  // ✅ Obtener una categoría por ID
  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.repo.findOne({
      where: { id, activo: true },
    })

    if (!categoria) throw new NotFoundException('Categoría no encontrada')
    return categoria
  }

  // ✅ Crear categoría
  async create(dto: CreateCategoriaDto): Promise<Categoria> {
    const categoria = this.repo.create(dto)
    return await this.repo.save(categoria)
  }

  // ✅ Actualizar categoría
  async update(id: number, dto: UpdateCategoriaDto): Promise<Categoria> {
    const categoria = await this.findOne(id)
    const actualizado = this.repo.merge(categoria, dto)
    return await this.repo.save(actualizado)
  }

  // ✅ Eliminación lógica
  async delete(id: number): Promise<Categoria> {
    const categoria = await this.findOne(id)
    categoria.activo = false
    return await this.repo.save(categoria)
  }

  // ✅ Obtener todas las categorías activas (sin paginación)
  async findAllActive(): Promise<Categoria[]> {
    return await this.repo.find({
      where: { activo: true },
      order: { nombre: 'ASC' },
    })
  }
}
