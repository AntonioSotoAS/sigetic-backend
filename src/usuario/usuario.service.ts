import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Usuario } from './entities/usuario.entity'
import { RolUsuario } from './roles.enum'
import { CreateUsuarioDto } from './dto/create-usuario.dto'
import { UpdateUsuarioDto } from './dto/update-usuario.dto'
import { FilterUsuarioDto } from './dto/filter-usuario.dto'
import { UpdatePasswordDto } from './dto/update-password.dto'
import { PaginationDto, PaginatedResponse } from '../common/dtos/pagination.dto'
import * as bcrypt from 'bcrypt'

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
      relations: ['sede', 'cargo', 'dependencia'],
    })
  }

  // ✅ Buscar por ID
  async findById(id: number): Promise<Usuario | null> {
    return await this.repo.findOne({
      where: { id, activo: true },
      relations: ['sede', 'cargo', 'dependencia'],
    })
  }

  // ✅ Listado paginado según rol con filtros
  async findAll(filterDto: FilterUsuarioDto, user: Usuario): Promise<PaginatedResponse<Usuario>> {
    const { limit = 10, offset = 0, search, rol } = filterDto

    const query = this.repo.createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.sede', 'sede')
      .leftJoinAndSelect('usuario.cargo', 'cargo')
      .leftJoinAndSelect('usuario.dependencia', 'dependencia')
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
      .leftJoinAndSelect('usuario.cargo', 'cargo')
      .leftJoinAndSelect('usuario.dependencia', 'dependencia')
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

  // ✅ Actualizar contraseña del usuario
  async updatePassword(userId: number, dto: UpdatePasswordDto): Promise<{ message: string }> {
    console.log('🔐 UPDATE PASSWORD - Iniciando actualización de contraseña...')
    console.log('🔐 UPDATE PASSWORD - User ID:', userId)
    console.log('🔐 UPDATE PASSWORD - DTO recibido:', {
      password_actual: dto.password_actual ? '***PROVIDED***' : 'NOT_PROVIDED',
      password_nuevo: dto.password_nuevo ? '***PROVIDED***' : 'NOT_PROVIDED'
    })

    // Buscar el usuario por ID
    console.log('🔐 UPDATE PASSWORD - Buscando usuario en BD...')
    const usuario = await this.repo.findOne({
      where: { id: userId, activo: true },
      select: ['id', 'password'] // Solo necesitamos estos campos
    })

    if (!usuario) {
      console.log('❌ UPDATE PASSWORD - Usuario no encontrado')
      throw new NotFoundException('Usuario no encontrado')
    }

    console.log('✅ UPDATE PASSWORD - Usuario encontrado:', {
      id: usuario.id,
      passwordHash: usuario.password ? '***HASHED***' : 'NULL'
    })

    // Verificar que la contraseña actual sea correcta
    console.log('🔐 UPDATE PASSWORD - Verificando contraseña actual...')
    const isPasswordValid = await bcrypt.compare(dto.password_actual, usuario.password)
    console.log('🔐 UPDATE PASSWORD - ¿Contraseña actual válida?', isPasswordValid)
    
    if (!isPasswordValid) {
      console.log('❌ UPDATE PASSWORD - Contraseña actual incorrecta')
      throw new BadRequestException('La contraseña actual es incorrecta')
    }

    // Verificar que la nueva contraseña sea diferente a la actual
    console.log('🔐 UPDATE PASSWORD - Verificando que nueva contraseña sea diferente...')
    const isSamePassword = await bcrypt.compare(dto.password_nuevo, usuario.password)
    console.log('🔐 UPDATE PASSWORD - ¿Nueva contraseña igual a la actual?', isSamePassword)
    
    if (isSamePassword) {
      console.log('❌ UPDATE PASSWORD - Nueva contraseña igual a la actual')
      throw new BadRequestException('La nueva contraseña debe ser diferente a la actual')
    }

    // Encriptar la nueva contraseña
    console.log('🔐 UPDATE PASSWORD - Encriptando nueva contraseña...')
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(dto.password_nuevo, saltRounds)
    console.log('🔐 UPDATE PASSWORD - Nueva contraseña encriptada:', hashedPassword ? '***HASHED***' : 'NULL')

    // Actualizar la contraseña en la base de datos
    console.log('🔐 UPDATE PASSWORD - Actualizando contraseña en BD...')
    await this.repo.update(userId, { 
      password: hashedPassword,
      password_resetada: true // Marcar como contraseña resetada
    })
    console.log('✅ UPDATE PASSWORD - Contraseña actualizada exitosamente en BD')

    console.log('✅ UPDATE PASSWORD - Proceso completado exitosamente')
    return { message: 'Contraseña actualizada exitosamente' }
  }

  // ✅ Obtener sedes de soporte asignadas al usuario
  async getSedesSoporte(userId: number): Promise<number[]> {
    const usuario = await this.repo.findOne({
      where: { id: userId, activo: true },
      select: ['id', 'sede_soporte']
    })

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado')
    }

    return usuario.sede_soporte || []
  }

  // ✅ Asignar sedes de soporte al usuario
  async assignSedesSoporte(userId: number, sedeIds: number[]): Promise<{ message: string }> {
    const usuario = await this.repo.findOne({
      where: { id: userId, activo: true }
    })

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado')
    }

    // Verificar que el usuario tenga un rol que permita múltiples sedes
    if (!['admin', 'jefe_soporte', 'ingeniero_soporte'].includes(usuario.rol)) {
      throw new BadRequestException('Este usuario no puede tener múltiples sedes de soporte asignadas')
    }

    await this.repo.update(userId, {
      sede_soporte: sedeIds
    })

    return { message: 'Sedes de soporte asignadas exitosamente' }
  }

  // ✅ Verificar si el usuario tiene acceso a una sede específica
  async hasAccessToSede(userId: number, sedeId: number): Promise<boolean> {
    const usuario = await this.repo.findOne({
      where: { id: userId, activo: true },
      select: ['id', 'sede_soporte', 'sede', 'rol']
    })

    if (!usuario) {
      return false
    }

    // Si es superadmin, tiene acceso a todas las sedes
    if (usuario.rol === 'superadmin') {
      return true
    }

    // Si tiene sedes de soporte asignadas, verificar si la sede está en la lista
    if (usuario.sede_soporte && usuario.sede_soporte.length > 0) {
      return usuario.sede_soporte.includes(sedeId)
    }

    // Si no tiene sedes de soporte, verificar su sede principal
    return usuario.sede?.id === sedeId
  }

  // ✅ Obtener IDs de sedes a las que tiene acceso el usuario
  async getSedeIdsAcceso(userId: number): Promise<number[]> {
    const usuario = await this.repo.findOne({
      where: { id: userId, activo: true },
      select: ['id', 'sede_soporte', 'sede', 'rol']
    })

    if (!usuario) {
      return []
    }

    // Si es superadmin, tiene acceso a todas las sedes
    if (usuario.rol === 'superadmin') {
      return [] // Retornar array vacío para indicar acceso total
    }

    // Si tiene sedes de soporte asignadas, retornar esas
    if (usuario.sede_soporte && usuario.sede_soporte.length > 0) {
      return usuario.sede_soporte
    }

    // Si no tiene sedes de soporte, retornar su sede principal
    return usuario.sede ? [usuario.sede.id] : []
  }
}
