import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like } from 'typeorm'
import { Sede } from './entities/sede.entity'
import { CreateSedeDto } from './dto/create-sede.dto'
import { UpdateSedeDto } from './dto/update-sede.dto'
import { FilterSedeDto } from './dto/filter-sede.dto'
import { Usuario } from '../usuario/entities/usuario.entity'
import { RolUsuario } from '../usuario/roles.enum'

@Injectable()
export class SedeService {
  constructor(
    @InjectRepository(Sede)
    private readonly repo: Repository<Sede>,
  ) {}

  async findAll(filters?: FilterSedeDto, user?: Usuario): Promise<{ data: Sede[]; total: number }> {
    const { search, activo, limit = 10, offset = 0 } = filters || {}
    
    const queryBuilder = this.repo.createQueryBuilder('sede')
    
    // Aplicar filtros
    if (search && search.trim() !== '') {
      queryBuilder.where(
        '(sede.nombre LIKE :search OR sede.direccion LIKE :search OR sede.ciudad LIKE :search)',
        { search: `%${search}%` }
      )
    }
    
    if (activo !== undefined && activo !== null) {
      queryBuilder.andWhere('sede.activo = :activo', { activo })
    } else {
      queryBuilder.andWhere('sede.activo = :activo', { activo: true })
    }
    
    // Contar total
    const total = await queryBuilder.getCount()
    
    // Aplicar paginación y ordenamiento
    const data = await queryBuilder
      .orderBy('sede.nombre', 'ASC')
      .skip(offset)
      .take(limit)
      .getMany()
    
    return { data, total }
  }

  async findOne(id: number, user?: Usuario): Promise<Sede> {
    const sede = await this.repo.findOne({
      where: { id, activo: true },
    })
    
    if (!sede) {
      throw new NotFoundException(`Sede con ID ${id} no encontrada`)
    }
    
    return sede
  }

  async create(createSedeDto: CreateSedeDto): Promise<Sede> {
    const sede = this.repo.create({
      ...createSedeDto,
      activo: createSedeDto.activo ?? true,
    })
    
    return await this.repo.save(sede)
  }

  async update(id: number, updateSedeDto: UpdateSedeDto): Promise<Sede> {
    const sede = await this.findOne(id)
    
    Object.assign(sede, updateSedeDto)
    
    return await this.repo.save(sede)
  }

  async remove(id: number): Promise<{ message: string }> {
    const sede = await this.findOne(id)
    
    // Soft delete - marcar como inactivo
    sede.activo = false
    await this.repo.save(sede)
    
    return { message: 'Sede eliminada exitosamente' }
  }

  async hardRemove(id: number): Promise<{ message: string }> {
    const sede = await this.findOne(id)
    
    // Hard delete - eliminar físicamente
    await this.repo.remove(sede)
    
    return { message: 'Sede eliminada permanentemente' }
  }
}
