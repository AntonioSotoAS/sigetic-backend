import {
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Subcategoria } from './entities/subcategoria.entity'
import { Categoria } from '../categoria/entities/categoria.entity'
import { CreateSubcategoriaDto } from './dto/create-subcategoria.dto'
import { UpdateSubcategoriaDto } from './dto/update-subcategoria.dto'
import { FilterSubcategoriaDto } from './dto/filter-subcategoria.dto'
import { PaginatedResponse } from '../common/dtos/pagination.dto'

@Injectable()
export class SubcategoriaService {
  constructor(
    @InjectRepository(Subcategoria)
    private readonly repo: Repository<Subcategoria>,
    @InjectRepository(Categoria)
    private readonly categoriaRepo: Repository<Categoria>,
  ) {}

  // ✅ Listado paginado con filtros
  async findAll(filterDto: FilterSubcategoriaDto): Promise<PaginatedResponse<Subcategoria>> {
    const { limit = 10, offset = 0, search, categoria_id } = filterDto

    const query = this.repo.createQueryBuilder('subcategoria')
      .leftJoinAndSelect('subcategoria.categoria', 'categoria')
      .where('subcategoria.activo = true')

    // Filtro por búsqueda
    if (search) {
      query.andWhere(
        '(subcategoria.nombre ILIKE :search OR categoria.nombre ILIKE :search)',
        { search: `%${search}%` }
      )
    }

    // Filtro por categoría
    if (categoria_id) {
      query.andWhere('subcategoria.categoria_id = :categoria_id', { categoria_id })
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

  // ✅ Obtener una subcategoría por ID
  async findOne(id: number): Promise<Subcategoria> {
    const subcategoria = await this.repo.findOne({
      where: { id, activo: true },
      relations: ['categoria'],
    })

    if (!subcategoria) throw new NotFoundException('Subcategoría no encontrada')
    return subcategoria
  }

  // ✅ Crear subcategoría
  async create(dto: CreateSubcategoriaDto): Promise<Subcategoria> {
    // Verificar que la categoría existe
    const categoria = await this.categoriaRepo.findOne({
      where: { id: dto.categoria_id, activo: true },
    })

    if (!categoria) throw new NotFoundException('Categoría no encontrada')

    const subcategoria = this.repo.create({
      nombre: dto.nombre,
      activo: dto.activo ?? true,
      categoria: categoria,
    })

    return await this.repo.save(subcategoria)
  }

  // ✅ Actualizar subcategoría
  async update(id: number, dto: UpdateSubcategoriaDto): Promise<Subcategoria> {
    const subcategoria = await this.findOne(id)
    
    // Si se está cambiando la categoría, verificar que existe
    if (dto.categoria_id && dto.categoria_id !== subcategoria.categoria.id) {
      const categoria = await this.categoriaRepo.findOne({
        where: { id: dto.categoria_id, activo: true },
      })

      if (!categoria) throw new NotFoundException('Categoría no encontrada')
      subcategoria.categoria = categoria
    }

    const actualizado = this.repo.merge(subcategoria, dto)
    return await this.repo.save(actualizado)
  }

  // ✅ Eliminación lógica
  async delete(id: number): Promise<Subcategoria> {
    const subcategoria = await this.findOne(id)
    subcategoria.activo = false
    return await this.repo.save(subcategoria)
  }

  // ✅ Obtener todas las subcategorías activas (sin paginación)
  async findAllActive(): Promise<Subcategoria[]> {
    return await this.repo.find({
      where: { activo: true },
      relations: ['categoria'],
      order: { categoria: { nombre: 'ASC' }, nombre: 'ASC' },
    })
  }

  // ✅ Obtener subcategorías por categoría
  async findByCategoria(categoria_id: number): Promise<Subcategoria[]> {
    return await this.repo.find({
      where: { categoria: { id: categoria_id }, activo: true },
      relations: ['categoria'],
      order: { nombre: 'ASC' },
    })
  }

  // ✅ Obtener subcategorías agrupadas por categoría
  async findAllGroupedByCategoria(): Promise<{ categoria: Categoria; subcategorias: Subcategoria[] }[]> {
    const subcategorias = await this.findAllActive()
    
    const grouped = subcategorias.reduce((acc, subcategoria) => {
      const categoriaId = subcategoria.categoria.id
      const existingGroup = acc.find(group => group.categoria.id === categoriaId)
      
      if (existingGroup) {
        existingGroup.subcategorias.push(subcategoria)
      } else {
        acc.push({
          categoria: subcategoria.categoria,
          subcategorias: [subcategoria]
        })
      }
      
      return acc
    }, [] as { categoria: Categoria; subcategorias: Subcategoria[] }[])

    return grouped.sort((a, b) => a.categoria.nombre.localeCompare(b.categoria.nombre))
  }
}
