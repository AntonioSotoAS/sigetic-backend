import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Usuario } from '../usuario/entities/usuario.entity'
import { Sede } from '../sede/entities/sede.entity'
import { Cargo } from '../cargo/entities/cargo.entity'
import { Dependencia } from '../dependencia/entities/dependencia.entity'
import { Categoria } from '../categoria/entities/categoria.entity'
import { Subcategoria } from '../subcategoria/entities/subcategoria.entity'
import { Ticket } from '../ticket/entities/ticket.entity'
import { ComentarioTicket, TipoComentario } from '../comentario-ticket/entities/comentario-ticket.entity'
import { usuarioData, sedeData, cargoData, dependenciaData, categoriaData, subcategoriaData, ticketData } from './data'
import { RolUsuario } from '../usuario/roles.enum'
import { PrioridadTicket, EstadoTicket } from '../ticket/entities/ticket.entity'
import * as bcrypt from 'bcrypt'

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
    @InjectRepository(Sede)
    private readonly sedeRepo: Repository<Sede>,
    @InjectRepository(Cargo)
    private readonly cargoRepo: Repository<Cargo>,
    @InjectRepository(Dependencia)
    private readonly dependenciaRepo: Repository<Dependencia>,
    @InjectRepository(Categoria)
    private readonly categoriaRepo: Repository<Categoria>,
    @InjectRepository(Subcategoria)
    private readonly subcategoriaRepo: Repository<Subcategoria>,
    @InjectRepository(Ticket)
    private readonly ticketRepo: Repository<Ticket>,
    @InjectRepository(ComentarioTicket)
    private readonly comentarioRepo: Repository<ComentarioTicket>,
  ) {}

  async seed() {
    console.log('🌱 Iniciando seed de datos...')

    // Seed de Sedes
    console.log('📍 Creando sedes...')
    const sedes = await this.seedSedes()

    // Seed de Dependencias
    console.log('🏢 Creando dependencias...')
    const dependencias = await this.seedDependencias()

    // Seed de Usuarios
    console.log('👥 Creando usuarios...')
    const usuarios = await this.seedUsuarios(sedes, dependencias)

    // Seed de Cargos
    console.log('💼 Creando cargos...')
    await this.seedCargos()

    // Seed de Categorías
    console.log('📂 Creando categorías...')
    const categorias = await this.seedCategorias()

    // Seed de Subcategorías
    console.log('📋 Creando subcategorías...')
    await this.seedSubcategorias(categorias)

    // Seed de Tickets
    console.log('🎫 Creando tickets...')
    await this.seedTickets(usuarios, dependencias, sedes)

    console.log('✅ Seed completado exitosamente!')
  }

  private async seedSedes(): Promise<Sede[]> {
    const sedes: Sede[] = []
    for (const sedeItem of sedeData) {
      const sede = this.sedeRepo.create(sedeItem)
      const savedSede = await this.sedeRepo.save(sede)
      sedes.push(savedSede)
    }
    return sedes
  }

  private async seedDependencias(): Promise<Dependencia[]> {
    const dependencias: Dependencia[] = []
    for (const dependenciaItem of dependenciaData) {
      const dependencia = this.dependenciaRepo.create(dependenciaItem)
      const savedDependencia = await this.dependenciaRepo.save(dependencia)
      dependencias.push(savedDependencia)
    }
    return dependencias
  }

  private async seedUsuarios(sedes: Sede[], dependencias: Dependencia[]): Promise<Usuario[]> {
    const usuarios: Usuario[] = []
    for (const userData of usuarioData) {
      const hashedPassword = await bcrypt.hash(userData.password, 10)
      const usuario = this.usuarioRepo.create({
        ...userData,
        password: hashedPassword,
        sede: sedes[0], // Asignar a la primera sede por defecto
        dependencia: dependencias[0], // Asignar a la primera dependencia por defecto
        rol: userData.rol as RolUsuario, // Type assertion para el enum
      } as any)
      const savedUsuario = await this.usuarioRepo.save(usuario as any)
      usuarios.push(savedUsuario)
    }
    return usuarios
  }

  private async seedCargos() {
    for (const cargoItem of cargoData) {
      const cargo = this.cargoRepo.create(cargoItem)
      await this.cargoRepo.save(cargo)
    }
  }

  private async seedCategorias(): Promise<Categoria[]> {
    const categorias: Categoria[] = []
    for (const categoriaItem of categoriaData) {
      const categoria = this.categoriaRepo.create(categoriaItem)
      const savedCategoria = await this.categoriaRepo.save(categoria)
      categorias.push(savedCategoria)
    }
    return categorias
  }

  private async seedSubcategorias(categorias: Categoria[]) {
    for (const subcategoriaItem of subcategoriaData) {
      // Encontrar la categoría correspondiente
      const categoria = categorias.find(c => c.id === subcategoriaItem.categoria_id)
      if (categoria) {
        const subcategoria = this.subcategoriaRepo.create({
          nombre: subcategoriaItem.nombre,
          activo: subcategoriaItem.activo,
          categoria: categoria,
        })
        await this.subcategoriaRepo.save(subcategoria)
      }
    }
  }

  private async seedTickets(usuarios: Usuario[], dependencias: Dependencia[], sedes: Sede[]) {
    // Obtener categorías y subcategorías para las relaciones
    const categorias = await this.categoriaRepo.find()
    const subcategorias = await this.subcategoriaRepo.find()

    for (const ticketItem of ticketData) {
      // Encontrar las entidades correspondientes
      const user = usuarios.find(u => u.id === ticketItem.user_id)
      const dependencia = dependencias.find(d => d.id === ticketItem.dependencia_id)
      const sede = sedes.find(s => s.id === ticketItem.sede_id)
      const tecnico = ticketItem.tecnico_id ? usuarios.find(u => u.id === ticketItem.tecnico_id) : null
      const categoria = ticketItem.categoria_id ? categorias.find(c => c.id === ticketItem.categoria_id) : null
      const subcategoria = ticketItem.subcategoria_id ? subcategorias.find(s => s.id === ticketItem.subcategoria_id) : null

      if (user && dependencia && sede) {
        const ticket = this.ticketRepo.create({
          titulo: ticketItem.titulo,
          descripcion: ticketItem.descripcion,
          prioridad: ticketItem.prioridad as PrioridadTicket,
          estado: ticketItem.estado as EstadoTicket,
          user: user,
          dependencia: dependencia,
          sede: sede,
          categoria: categoria,
          subcategoria: subcategoria,
          tecnico: tecnico,
          fecha_asignacion: ticketItem.fecha_asignacion,
          fecha_resolucion: ticketItem.fecha_resolucion,
          fecha_cierre: ticketItem.fecha_cierre,
        } as any)
        const savedTicket = await this.ticketRepo.save(ticket)

        // Crear comentarios si existen
        if (ticketItem.comentarios_ticket && ticketItem.comentarios_ticket.length > 0) {
          for (const comentarioItem of ticketItem.comentarios_ticket) {
            const comentarioUser = usuarios.find(u => u.id === comentarioItem.user_id)
            if (comentarioUser) {
              const comentario = this.comentarioRepo.create({
                ticket: savedTicket,
                user: comentarioUser,
                comentario: comentarioItem.comentario,
                tipo: comentarioItem.tipo as TipoComentario,
              } as any)
              await this.comentarioRepo.save(comentario)
            }
          }
        }
      }
    }
  }
} 