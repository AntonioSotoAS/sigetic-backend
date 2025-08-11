import {
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Ticket, EstadoTicket } from './entities/ticket.entity'
import { Usuario } from '../usuario/entities/usuario.entity'
import { Dependencia } from '../dependencia/entities/dependencia.entity'
import { Sede } from '../sede/entities/sede.entity'
import { Categoria } from '../categoria/entities/categoria.entity'
import { Subcategoria } from '../subcategoria/entities/subcategoria.entity'
import { ComentarioTicket, TipoComentario } from '../comentario-ticket/entities/comentario-ticket.entity'
import { CreateTicketDto } from './dto/create-ticket.dto'
import { UpdateTicketDto } from './dto/update-ticket.dto'
import { FilterTicketDto } from './dto/filter-ticket.dto'
import { PaginatedResponse } from '../common/dtos/pagination.dto'
import { RealtimeService } from '../realtime/realtime.service'

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly repo: Repository<Ticket>,
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
    @InjectRepository(Dependencia)
    private readonly dependenciaRepo: Repository<Dependencia>,
    @InjectRepository(Sede)
    private readonly sedeRepo: Repository<Sede>,
    @InjectRepository(Categoria)
    private readonly categoriaRepo: Repository<Categoria>,
    @InjectRepository(Subcategoria)
    private readonly subcategoriaRepo: Repository<Subcategoria>,
    @InjectRepository(ComentarioTicket)
    private readonly comentarioRepo: Repository<ComentarioTicket>,
    private readonly realtime: RealtimeService,
  ) {}

  // ✅ Listado paginado con filtros
  async findAll(filterDto: FilterTicketDto, user: Usuario): Promise<PaginatedResponse<Ticket>> {
    const { limit = 10, offset = 0, search, estado, prioridad, categoria_id, subcategoria_id, dependencia_id, sede_id, tecnico_id, user_id } = filterDto

    const query = this.repo.createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.user', 'user')
      .leftJoinAndSelect('ticket.dependencia', 'dependencia')
      .leftJoinAndSelect('ticket.sede', 'sede')
      .leftJoinAndSelect('ticket.categoria', 'categoria')
      .leftJoinAndSelect('ticket.subcategoria', 'subcategoria')
      .leftJoinAndSelect('ticket.tecnico', 'tecnico')

    // Filtro por búsqueda
    if (search) {
      query.andWhere(
        '(ticket.titulo ILIKE :search OR ticket.descripcion ILIKE :search)',
        { search: `%${search}%` }
      )
    }

    // Filtros específicos
    if (estado) query.andWhere('ticket.estado = :estado', { estado })
    if (prioridad) query.andWhere('ticket.prioridad = :prioridad', { prioridad })
    if (categoria_id) query.andWhere('ticket.categoria_id = :categoria_id', { categoria_id })
    if (subcategoria_id) query.andWhere('ticket.subcategoria_id = :subcategoria_id', { subcategoria_id })
    if (dependencia_id) query.andWhere('ticket.dependencia_id = :dependencia_id', { dependencia_id })
    if (sede_id) query.andWhere('ticket.sede_id = :sede_id', { sede_id })
    if (tecnico_id) query.andWhere('ticket.tecnico_id = :tecnico_id', { tecnico_id })
    if (user_id) query.andWhere('ticket.user_id = :user_id', { user_id })

    // Filtro por sede según rol del usuario
    if (user.rol !== 'superadmin') {
      query.andWhere('ticket.sede_id = :userSedeId', { userSedeId: user.sede.id })
    }

    const [data, total] = await query
      .orderBy('ticket.created_at', 'DESC')
      .take(limit)
      .skip(offset)
      .getManyAndCount()

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

  // ✅ Obtener un ticket por ID
  async findOne(id: number, user: Usuario): Promise<Ticket> {
    const ticket = await this.repo.findOne({
      where: { id },
      relations: ['user', 'dependencia', 'sede', 'categoria', 'subcategoria', 'tecnico', 'comentarios_ticket', 'comentarios_ticket.user'],
    })

    if (!ticket) throw new NotFoundException('Ticket no encontrado')

    // Verificar acceso según rol
    if (user.rol !== 'superadmin' && ticket.sede.id !== user.sede.id) {
      throw new NotFoundException('Ticket no encontrado')
    }

    return ticket
  }

  // ✅ Crear ticket
  async create(dto: CreateTicketDto, user: Usuario): Promise<Ticket> {
    // Verificar que el usuario solicitante existe
    const usuarioSolicitante = await this.usuarioRepo.findOne({
      where: { id: dto.user_id, activo: true },
    })
    if (!usuarioSolicitante) throw new NotFoundException('Usuario solicitante no encontrado')

    // Verificar que la dependencia y sede existen
    const dependencia = await this.dependenciaRepo.findOne({
      where: { id: dto.dependencia_id, activo: true },
    })
    if (!dependencia) throw new NotFoundException('Dependencia no encontrada')

    const sede = await this.sedeRepo.findOne({
      where: { id: dto.sede_id, activo: true },
    })
    if (!sede) throw new NotFoundException('Sede no encontrada')

    // Si se proporciona un técnico, verificar que existe
    let tecnico: Usuario | null = null
    if (dto.tecnico_id) {
      tecnico = await this.usuarioRepo.findOne({
        where: { id: dto.tecnico_id, activo: true },
      })
      if (!tecnico) throw new NotFoundException('Técnico no encontrado')
    }

    // Si se proporciona una categoría, verificar que existe
    let categoria: Categoria | null = null
    if (dto.categoria_id) {
      categoria = await this.categoriaRepo.findOne({
        where: { id: dto.categoria_id, activo: true },
      })
      if (!categoria) throw new NotFoundException('Categoría no encontrada')
    }

    // Si se proporciona una subcategoría, verificar que existe
    let subcategoria: Subcategoria | null = null
    if (dto.subcategoria_id) {
      subcategoria = await this.subcategoriaRepo.findOne({
        where: { id: dto.subcategoria_id, activo: true },
      })
      if (!subcategoria) throw new NotFoundException('Subcategoría no encontrada')
    }

    const ticket = new Ticket()
    ticket.titulo = dto.titulo || null
    ticket.descripcion = dto.descripcion || null
    ticket.prioridad = dto.prioridad
    ticket.user = usuarioSolicitante // El solicitante especificado en el DTO
    ticket.dependencia = dependencia
    ticket.sede = sede
    ticket.categoria = categoria
    ticket.subcategoria = subcategoria
    ticket.tecnico = tecnico // El técnico asignado (puede ser null)
    ticket.estado = tecnico ? EstadoTicket.ASIGNADO : EstadoTicket.PENDIENTE
    if (tecnico) {
      ticket.fecha_asignacion = new Date()
    }

    const savedTicket = await this.repo.save(ticket)

    // Emitir evento de ticket creado
    this.realtime.emitToSede(savedTicket.sede.id, 'ticket.created', {
      id: savedTicket.id,
      titulo: savedTicket.titulo,
      prioridad: savedTicket.prioridad,
      estado: savedTicket.estado,
      created_at: savedTicket.created_at,
      user: {
        id: savedTicket.user.id,
        nombres: savedTicket.user.nombres,
        apellidos_paterno: savedTicket.user.apellidos_paterno,
        apellidos_materno: savedTicket.user.apellidos_materno,
      },
      dependencia: {
        id: savedTicket.dependencia.id,
        nombre: savedTicket.dependencia.nombre,
      },
    })

    // Emitir a sala de tickets sin asignar
    this.realtime.emitToAll('tickets:unassigned', {
      action: 'created',
      ticket: {
        id: savedTicket.id,
        titulo: savedTicket.titulo,
        prioridad: savedTicket.prioridad,
        estado: savedTicket.estado,
      },
    })

    return savedTicket
  }

  // ✅ Actualizar ticket
  async update(id: number, dto: UpdateTicketDto, user: Usuario): Promise<Ticket> {
    const ticket = await this.findOne(id, user)

    // Si se está asignando un técnico, verificar que existe
    if (dto.tecnico_id) {
      const tecnico = await this.usuarioRepo.findOne({
        where: { id: dto.tecnico_id, activo: true },
      })
      if (!tecnico) throw new NotFoundException('Técnico no encontrado')
      ticket.tecnico = tecnico
    }

    // Manejar fechas explícitas del DTO
    if (dto.fecha_asignacion) {
      ticket.fecha_asignacion = new Date(dto.fecha_asignacion)
    }
    if (dto.fecha_resolucion) {
      ticket.fecha_resolucion = new Date(dto.fecha_resolucion)
    }
    if (dto.fecha_cierre) {
      ticket.fecha_cierre = new Date(dto.fecha_cierre)
    }

    // Actualizar fechas automáticamente según el estado (solo si no se proporcionaron explícitamente)
    if (dto.estado === EstadoTicket.ASIGNADO && !ticket.fecha_asignacion && !dto.fecha_asignacion) {
      ticket.fecha_asignacion = new Date()
    }
    if (dto.estado === EstadoTicket.RESUELTO && !ticket.fecha_resolucion && !dto.fecha_resolucion) {
      ticket.fecha_resolucion = new Date()
    }
    if (dto.estado === EstadoTicket.CERRADO && !ticket.fecha_cierre && !dto.fecha_cierre) {
      ticket.fecha_cierre = new Date()
    }

    const actualizado = this.repo.merge(ticket, dto)
    const savedTicket = await this.repo.save(actualizado)

    // Crear comentario interno si se proporciona
    if (dto.comentario_interno) {
      await this.comentarioRepo.save({
        ticket: savedTicket,
        user: user,
        comentario: dto.comentario_interno,
        tipo: TipoComentario.INTERNO,
      })
    }

    // Emitir eventos según los cambios
    if (dto.tecnico_id && savedTicket.tecnico) {
      // Notificar al técnico asignado
      this.realtime.emitToTecnico(savedTicket.tecnico.id, 'ticket.assigned', {
        id: savedTicket.id,
        titulo: savedTicket.titulo,
        prioridad: savedTicket.prioridad,
        estado: savedTicket.estado,
        user: {
          id: savedTicket.user.id,
          nombres: savedTicket.user.nombres,
          apellidos_paterno: savedTicket.user.apellidos_paterno,
        },
      })
    }

    if (dto.estado) {
      // Notificar cambio de estado
      this.realtime.emitToTicket(savedTicket.id, 'ticket.status_changed', {
        id: savedTicket.id,
        estado: savedTicket.estado,
        updated_at: savedTicket.updated_at,
      })

      // Notificar a la sede
      this.realtime.emitToSede(savedTicket.sede.id, 'ticket.updated', {
        id: savedTicket.id,
        titulo: savedTicket.titulo,
        estado: savedTicket.estado,
        tecnico: savedTicket.tecnico ? {
          id: savedTicket.tecnico.id,
          nombres: savedTicket.tecnico.nombres,
          apellidos_paterno: savedTicket.tecnico.apellidos_paterno,
        } : null,
      })
    }

    return await this.findOne(id, user)
  }

  // ✅ Eliminar ticket
  async delete(id: number, user: Usuario): Promise<void> {
    const ticket = await this.findOne(id, user)
    await this.repo.remove(ticket)
  }

  // ✅ Obtener tickets sin asignar de mi sede
  async findSinAsignarMiSede(user: Usuario): Promise<Ticket[]> {
    console.log('🔍 findSinAsignarMiSede - Usuario:', {
      id: user.id,
      nombres: user.nombres,
      rol: user.rol,
      sedeId: user.sede?.id,
      sedeNombre: user.sede?.nombre
    })

    const query = this.repo.createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.user', 'user')
      .leftJoinAndSelect('ticket.dependencia', 'dependencia')
      .leftJoinAndSelect('ticket.sede', 'sede')
      .leftJoinAndSelect('ticket.categoria', 'categoria')
      .leftJoinAndSelect('ticket.subcategoria', 'subcategoria')
      .where('ticket.tecnico_id IS NULL')
      .andWhere('ticket.estado IN (:...estados)', { 
        estados: [EstadoTicket.PENDIENTE, EstadoTicket.ASIGNADO] 
      })

    // Filtro por sede del usuario (todos los roles ven solo su sede)
    query.andWhere('ticket.sede_id = :userSedeId', { userSedeId: user.sede.id })
    console.log('🔍 findSinAsignarMiSede - Filtro por sede aplicado:', user.sede.id)

    const tickets = await query
      .orderBy('ticket.prioridad', 'DESC')
      .addOrderBy('ticket.created_at', 'ASC')
      .getMany()
    
    console.log('🔍 findSinAsignarMiSede - Tickets encontrados:', tickets.length)
    
    if (tickets.length > 0) {
      console.log('🔍 findSinAsignarMiSede - Primer ticket:', {
        id: tickets[0].id,
        titulo: tickets[0].titulo,
        sedeId: tickets[0].sede?.id,
        tecnicoId: tickets[0].tecnico?.id
      })
    }

    return tickets
  }

  // ✅ Obtener tickets sin asignar (método original para superadmin)
  async findSinAsignar(user: Usuario): Promise<Ticket[]> {
    console.log('🔍 findSinAsignar - Usuario:', {
      id: user.id,
      nombres: user.nombres,
      rol: user.rol,
      sedeId: user.sede?.id,
      sedeNombre: user.sede?.nombre
    })

    const query = this.repo.createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.user', 'user')
      .leftJoinAndSelect('ticket.dependencia', 'dependencia')
      .leftJoinAndSelect('ticket.sede', 'sede')
      .where('ticket.tecnico_id IS NULL')
      .andWhere('ticket.estado IN (:...estados)', { 
        estados: [EstadoTicket.PENDIENTE, EstadoTicket.ASIGNADO] 
      })

    // Filtro por sede según rol del usuario
    if (user.rol !== 'superadmin') {
      query.andWhere('ticket.sede_id = :userSedeId', { userSedeId: user.sede.id })
      console.log('🔍 findSinAsignar - Filtro por sede aplicado:', user.sede.id)
    } else {
      console.log('🔍 findSinAsignar - Superadmin, sin filtro de sede')
    }

    const tickets = await query.orderBy('ticket.prioridad', 'DESC').getMany()
    console.log('🔍 findSinAsignar - Tickets encontrados:', tickets.length)
    
    if (tickets.length > 0) {
      console.log('🔍 findSinAsignar - Primer ticket:', {
        id: tickets[0].id,
        titulo: tickets[0].titulo,
        sedeId: tickets[0].sede?.id,
        tecnicoId: tickets[0].tecnico?.id
      })
    }

    return tickets
  }

  // ✅ Obtener mis tickets (usuario actual)
  async findMisTickets(user: Usuario): Promise<Ticket[]> {
    return await this.repo.find({
      where: { user: { id: user.id } },
      relations: ['dependencia', 'sede', 'tecnico'],
      order: { created_at: 'DESC' },
    })
  }

  // ✅ Obtener tickets asignados a un técnico
  async findTicketsAsignados(tecnicoId: number, user: Usuario): Promise<Ticket[]> {
    console.log('🔍 findTicketsAsignados - Parámetros:', {
      tecnicoId,
      userId: user.id,
      userRol: user.rol,
      userSedeId: user.sede?.id
    })

    const query = this.repo.createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.user', 'user')
      .leftJoinAndSelect('ticket.dependencia', 'dependencia')
      .leftJoinAndSelect('ticket.sede', 'sede')
      .where('ticket.tecnico_id = :tecnicoId', { tecnicoId })

    // Filtro por sede según rol del usuario
    if (user.rol !== 'superadmin') {
      query.andWhere('ticket.sede_id = :userSedeId', { userSedeId: user.sede.id })
      console.log('🔍 findTicketsAsignados - Filtro por sede aplicado:', user.sede.id)
    } else {
      console.log('🔍 findTicketsAsignados - Superadmin, sin filtro de sede')
    }

    const tickets = await query.orderBy('ticket.created_at', 'DESC').getMany()
    console.log('🔍 findTicketsAsignados - Tickets encontrados:', tickets.length)
    
    if (tickets.length > 0) {
      console.log('🔍 findTicketsAsignados - Primer ticket:', {
        id: tickets[0].id,
        titulo: tickets[0].titulo,
        tecnicoId: tickets[0].tecnico?.id,
        sedeId: tickets[0].sede?.id
      })
    }

    return tickets
  }

  // ✅ Obtener mis tickets asignados (para técnicos)
  async findMisTicketsAsignados(user: Usuario): Promise<Ticket[]> {
    const query = this.repo.createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.user', 'user')
      .leftJoinAndSelect('ticket.dependencia', 'dependencia')
      .leftJoinAndSelect('ticket.sede', 'sede')
      .leftJoinAndSelect('ticket.categoria', 'categoria')
      .leftJoinAndSelect('ticket.subcategoria', 'subcategoria')
      .where('ticket.tecnico_id = :tecnicoId', { tecnicoId: user.id })

    // Filtro por sede según rol del usuario
    if (user.rol !== 'superadmin') {
      query.andWhere('ticket.sede_id = :userSedeId', { userSedeId: user.sede.id })
    }

    return await query
      .orderBy('ticket.prioridad', 'DESC')
      .addOrderBy('ticket.created_at', 'ASC')
      .getMany()
  }

  // ✅ Obtener mis tickets creados (para usuarios regulares)
  async findMisTicketsCreados(user: Usuario): Promise<Ticket[]> {
    const query = this.repo.createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.dependencia', 'dependencia')
      .leftJoinAndSelect('ticket.sede', 'sede')
      .leftJoinAndSelect('ticket.categoria', 'categoria')
      .leftJoinAndSelect('ticket.subcategoria', 'subcategoria')
      .leftJoinAndSelect('ticket.tecnico', 'tecnico')
      .where('ticket.user_id = :userId', { userId: user.id })

    // Filtro por sede según rol del usuario
    if (user.rol !== 'superadmin') {
      query.andWhere('ticket.sede_id = :userSedeId', { userSedeId: user.sede.id })
    }

    return await query
      .orderBy('ticket.created_at', 'DESC')
      .getMany()
  }

  // 🔍 Método de debug para verificar tickets en la BD
  async debugTickets(user: Usuario): Promise<any> {
    console.log('🔍 DEBUG - Verificando tickets en la base de datos...')
    
    // Contar todos los tickets
    const totalTickets = await this.repo.count()
    console.log('🔍 DEBUG - Total de tickets en BD:', totalTickets)
    
    // Contar tickets por sede
    const ticketsPorSede = await this.repo
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.sede', 'sede')
      .select(['sede.id', 'sede.nombre', 'COUNT(ticket.id) as count'])
      .groupBy('sede.id')
      .addGroupBy('sede.nombre')
      .getRawMany()
    
    console.log('🔍 DEBUG - Tickets por sede:', ticketsPorSede)
    
    // Contar tickets sin asignar usando query builder
    const ticketsSinAsignar = await this.repo
      .createQueryBuilder('ticket')
      .where('ticket.tecnico_id IS NULL')
      .getCount()
    console.log('🔍 DEBUG - Tickets sin asignar:', ticketsSinAsignar)
    
    // Contar tickets por estado
    const ticketsPorEstado = await this.repo
      .createQueryBuilder('ticket')
      .select(['ticket.estado', 'COUNT(ticket.id) as count'])
      .groupBy('ticket.estado')
      .getRawMany()
    
    console.log('🔍 DEBUG - Tickets por estado:', ticketsPorEstado)
    
    // Verificar tickets de la sede del usuario
    if (user.sede) {
      const ticketsDeMiSede = await this.repo.count({
        where: { sede: { id: user.sede.id } }
      })
      console.log('🔍 DEBUG - Tickets de mi sede:', ticketsDeMiSede)
      
      const ticketsSinAsignarMiSede = await this.repo
        .createQueryBuilder('ticket')
        .where('ticket.sede_id = :sedeId', { sedeId: user.sede.id })
        .andWhere('ticket.tecnico_id IS NULL')
        .andWhere('ticket.estado = :estado', { estado: 'pendiente' })
        .getCount()
      console.log('🔍 DEBUG - Tickets sin asignar de mi sede:', ticketsSinAsignarMiSede)
    }
    
    return {
      totalTickets,
      ticketsPorSede,
      ticketsSinAsignar,
      ticketsPorEstado,
      userSede: user.sede
    }
  }
}
