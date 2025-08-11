import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Dependencia } from './entities/dependencia.entity'
import { CreateDependenciaDto } from './dto/create-dependencia.dto'
import { UpdateDependenciaDto } from './dto/update-dependencia.dto'
import { FilterDependenciaDto } from './dto/filter-dependencia.dto'
import { Usuario } from '../usuario/entities/usuario.entity'

@Injectable()
export class DependenciaService {
  constructor(
    @InjectRepository(Dependencia)
    private readonly repo: Repository<Dependencia>,
  ) {}

  async findAll(filters?: FilterDependenciaDto, user?: Usuario): Promise<{ data: Dependencia[]; total: number }> {
    const { search, activo, limit = 10, offset = 0 } = filters || {}
    
    const queryBuilder = this.repo.createQueryBuilder('dependencia')
    
    // Aplicar filtros
    if (search && search.trim() !== '') {
      queryBuilder.where(
        '(dependencia.nombre LIKE :search OR dependencia.descripcion LIKE :search)',
        { search: `%${search}%` }
      )
    }
    
    if (activo !== undefined && activo !== null) {
      queryBuilder.andWhere('dependencia.activo = :activo', { activo })
    } else {
      queryBuilder.andWhere('dependencia.activo = :activo', { activo: true })
    }
    
    // Contar total
    const total = await queryBuilder.getCount()
    
    // Aplicar paginación y ordenamiento
    const data = await queryBuilder
      .orderBy('dependencia.nombre', 'ASC')
      .skip(offset)
      .take(limit)
      .getMany()
    
    return { data, total }
  }

  async findOne(id: number, user?: Usuario): Promise<Dependencia> {
    const dependencia = await this.repo.findOne({
      where: { id, activo: true },
    })
    
    if (!dependencia) {
      throw new NotFoundException(`Dependencia con ID ${id} no encontrada`)
    }
    
    return dependencia
  }

  async create(createDependenciaDto: CreateDependenciaDto): Promise<Dependencia> {
    const dependencia = this.repo.create({
      ...createDependenciaDto,
      activo: createDependenciaDto.activo ?? true,
    })
    
    return await this.repo.save(dependencia)
  }

  async update(id: number, updateDependenciaDto: UpdateDependenciaDto): Promise<Dependencia> {
    const dependencia = await this.findOne(id)
    
    Object.assign(dependencia, updateDependenciaDto)
    
    return await this.repo.save(dependencia)
  }

  async remove(id: number): Promise<{ message: string }> {
    const dependencia = await this.findOne(id)
    
    // Soft delete - marcar como inactivo
    dependencia.activo = false
    await this.repo.save(dependencia)
    
    return { message: 'Dependencia eliminada exitosamente' }
  }

  async hardRemove(id: number): Promise<{ message: string }> {
    const dependencia = await this.findOne(id)
    
    // Hard delete - eliminar físicamente
    await this.repo.remove(dependencia)
    
    return { message: 'Dependencia eliminada permanentemente' }
  }
}
