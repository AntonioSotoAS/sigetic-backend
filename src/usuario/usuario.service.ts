import {
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Usuario } from './entities/usuario.entity'
import { RolUsuario } from './roles.enum'
import { CreateUsuarioDto } from './dto/create-usuario.dto'
import { UpdateUsuarioDto } from './dto/update-usuario.dto'
import { FilterUsuarioDto } from './dto/filter-usuario.dto'
import { PaginatedResponse } from '../common/dtos/pagination.dto'

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly repo: Repository<Usuario>,
  ) {}

  // ✅ Login y validación
  async findByCorreo(correo: string): Promise<Usuario | null> {
    return await this.repo.findOne({
      where: { correo, activo: true },
      relations: ['sede'],
    })
  }

  // ✅ Buscar por ID
  async findById(id: number): Promise<Usuario | null> {
    return await this.repo.findOne({
      where: { id, activo: true },
      relations: ['sede'],
    })
  }

  // ✅ Listado paginado según rol con filtros
  async findAll(filterDto: FilterUsuarioDto, user: Usuario): Promise<PaginatedResponse<Usuario>> {
    const { limit = 10, offset = 0, search, rol } = filterDto

    const query = this.repo.createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.sede', 'sede')
      .where('usuario.activo = true')

    // Filtro por sede (según rol del usuario)
    if (user.rol !== RolUsuario.SUPERADMIN) {
      query.andWhere('usuario.sede_id = :sedeId', { sedeId: user.sede.id })
    }

    // Filtro por búsqueda
    if (search) {
      query.andWhere(
        '(usuario.nombres ILIKE :search OR usuario.apellidos_paterno ILIKE :search OR usuario.apellidos_materno ILIKE :search OR usuario.correo ILIKE :search OR usuario.dni ILIKE :search OR usuario.telefono ILIKE :search)',
        { search: `%${search}%` }
      )
    }

    // Filtro por rol
    if (rol) {
      query.andWhere('usuario.rol = :rol', { rol })
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

  // ✅ Obtener uno, filtrando por sede y activo
  async findOne(id: number, user: Usuario): Promise<Usuario> {
    const query = this.repo.createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.sede', 'sede')
      .where('usuario.id = :id', { id })
      .andWhere('usuario.activo = true')

    if (user.rol !== RolUsuario.SUPERADMIN) {
      query.andWhere('usuario.sede_id = :sedeId', { sedeId: user.sede.id })
    }

    const usuario = await query.getOne()

    if (!usuario) throw new NotFoundException('Usuario no encontrado')
    return usuario
  }

  // ✅ Crear
  async create(dto: CreateUsuarioDto): Promise<Usuario> {
    const usuario = this.repo.create(dto)
    return await this.repo.save(usuario)
  }

  // ✅ Actualizar parcialmente
  async update(id: number, dto: UpdateUsuarioDto, user: Usuario): Promise<Usuario> {
    const usuario = await this.findOne(id, user)
    const actualizado = this.repo.merge(usuario, dto)
    return await this.repo.save(actualizado)
  }

  // ✅ Eliminación lógica
  async delete(id: number, user: Usuario): Promise<Usuario> {
    const usuario = await this.findOne(id, user)
    usuario.activo = false
    return await this.repo.save(usuario)
  }

  async getRol(id: number): Promise<RolUsuario[]> {
    const usuario = await this.repo.findOne({ where: { id, activo: true } })
  
    if (!usuario) throw new NotFoundException('Usuario no encontrado')
  
    switch (usuario.rol) {
      case RolUsuario.SUPERADMIN:
        return [
          RolUsuario.SUPERADMIN,
          RolUsuario.ADMIN,
          RolUsuario.INGENIERO_SOPORTE,
          RolUsuario.JEFE_SOPORTE,
          RolUsuario.USUARIO,
        ]
      case RolUsuario.ADMIN:
        return [
          RolUsuario.ADMIN,
          RolUsuario.INGENIERO_SOPORTE,
          RolUsuario.JEFE_SOPORTE,
          RolUsuario.USUARIO,
        ]
      case RolUsuario.JEFE_SOPORTE:
        return [
          RolUsuario.INGENIERO_SOPORTE,
          RolUsuario.USUARIO,
        ]
      case RolUsuario.INGENIERO_SOPORTE:
        return [
          RolUsuario.USUARIO,
        ]
      case RolUsuario.USUARIO:
        return [
          RolUsuario.USUARIO,
        ]
      default:
        return []
    }
  }
}
