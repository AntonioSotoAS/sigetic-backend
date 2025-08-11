# 🎫 Módulo de Tickets - Actualizado

## 📋 Cambios Realizados

### ✅ **Estructura Actualizada:**
- **Eliminado**: Campo `comentarios` (se usan comentarios_ticket para esto)
- **Cambiado**: `categoria` y `subcategoria` ahora son relaciones con IDs
- **Mantenido**: Todos los demás campos y funcionalidades

## 🏗️ **Nueva Estructura de la Entidad Ticket**

```typescript
@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { nullable: true })
  titulo: string | null

  @Column('text', { nullable: true })
  descripcion: string | null

  @Column({ type: 'enum', enum: PrioridadTicket })
  prioridad: PrioridadTicket

  @Column({ type: 'enum', enum: EstadoTicket, default: EstadoTicket.PENDIENTE })
  estado: EstadoTicket

  // Relaciones
  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'user_id' })
  user: Usuario

  @ManyToOne(() => Dependencia)
  @JoinColumn({ name: 'dependencia_id' })
  dependencia: Dependencia

  @ManyToOne(() => Sede)
  @JoinColumn({ name: 'sede_id' })
  sede: Sede

  @ManyToOne(() => Categoria, { nullable: true })
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria | null

  @ManyToOne(() => Subcategoria, { nullable: true })
  @JoinColumn({ name: 'subcategoria_id' })
  subcategoria: Subcategoria | null

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'tecnico_id' })
  tecnico: Usuario | null

  // Fechas
  @Column('datetime', { nullable: true })
  fecha_asignacion: Date | null

  @Column('datetime', { nullable: true })
  fecha_resolucion: Date | null

  @Column('datetime', { nullable: true })
  fecha_cierre: Date | null

  // Comentarios
  @OneToMany(() => ComentarioTicket, (comentario) => comentario.ticket)
  comentarios_ticket: ComentarioTicket[]

  // Timestamps
  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
```

## 📝 **DTOs Actualizados**

### **CreateTicketDto:**
```typescript
export class CreateTicketDto {
  @IsNumber()
  user_id: number

  @IsOptional()
  @IsString()
  titulo?: string

  @IsOptional()
  @IsString()
  descripcion?: string

  @IsEnum(PrioridadTicket)
  prioridad: PrioridadTicket

  @IsNumber()
  dependencia_id: number

  @IsNumber()
  sede_id: number

  @IsOptional()
  @IsNumber()
  categoria_id?: number

  @IsOptional()
  @IsNumber()
  subcategoria_id?: number

  @IsOptional()
  @IsNumber()
  tecnico_id?: number
}
```

### **FilterTicketDto:**
```typescript
export class FilterTicketDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string

  @IsOptional()
  @IsEnum(EstadoTicket)
  estado?: EstadoTicket

  @IsOptional()
  @IsEnum(PrioridadTicket)
  prioridad?: PrioridadTicket

  @IsOptional()
  @IsNumber()
  categoria_id?: number

  @IsOptional()
  @IsNumber()
  subcategoria_id?: number

  @IsOptional()
  @IsNumber()
  dependencia_id?: number

  @IsOptional()
  @IsNumber()
  sede_id?: number

  @IsOptional()
  @IsNumber()
  tecnico_id?: number

  @IsOptional()
  @IsNumber()
  user_id?: number
}
```

## 📊 **Ejemplos de Uso**

### **Crear Ticket Completo:**
```json
{
  "user_id": 1,
  "titulo": "Problema con la impresora",
  "descripcion": "La impresora no imprime y muestra error de papel",
  "prioridad": "alta",
  "dependencia_id": 1,
  "sede_id": 1,
  "categoria_id": 1,
  "subcategoria_id": 1,
  "tecnico_id": 2
}
```

### **Crear Ticket Mínimo:**
```json
{
  "user_id": 1,
  "prioridad": "baja",
  "dependencia_id": 1,
  "sede_id": 1
}
```

### **Crear Ticket con Categoría:**
```json
{
  "user_id": 1,
  "titulo": "Problema de red",
  "descripcion": "No hay conexión WiFi",
  "prioridad": "urgente",
  "dependencia_id": 1,
  "sede_id": 1,
  "categoria_id": 3,
  "subcategoria_id": 10
}
```

## 🔍 **Filtros Disponibles**

### **Por Categoría y Subcategoría:**
```
GET /api/v1/tickets?categoria_id=1
GET /api/v1/tickets?subcategoria_id=1
GET /api/v1/tickets?categoria_id=1&subcategoria_id=1
```

### **Combinaciones:**
```
GET /api/v1/tickets?estado=pendiente&prioridad=alta&categoria_id=1
GET /api/v1/tickets?user_id=1&tecnico_id=2
GET /api/v1/tickets?dependencia_id=1&sede_id=1
```

## 🎯 **Campos del Ticket**

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `user_id` | number | ✅ | ID del usuario solicitante |
| `titulo` | string | ❌ | Título del ticket |
| `descripcion` | string | ❌ | Descripción del problema |
| `prioridad` | enum | ✅ | Prioridad del ticket |
| `dependencia_id` | number | ✅ | ID de la dependencia |
| `sede_id` | number | ✅ | ID de la sede |
| `categoria_id` | number | ❌ | ID de la categoría |
| `subcategoria_id` | number | ❌ | ID de la subcategoría |
| `tecnico_id` | number | ❌ | ID del técnico asignado |

## 🚀 **Prioridades**

- **BAJA**: Problema menor, no urgente
- **MEDIA**: Problema moderado
- **ALTA**: Problema importante
- **URGENTE**: Problema crítico que requiere atención inmediata

## 🎯 **Estados del Ticket**

- **PENDIENTE**: Ticket creado, esperando asignación
- **ASIGNADO**: Ticket asignado a un técnico
- **EN_PROCESO**: Técnico trabajando en el ticket
- **RESUELTO**: Problema solucionado
- **CERRADO**: Ticket cerrado completamente

## 📝 **Comentarios**

Los comentarios ahora se manejan a través de la entidad `ComentarioTicket` que permite:
- Comentarios públicos (visibles al solicitante)
- Comentarios internos (solo para técnicos/admin)
- Historial completo de comentarios por ticket

## 🔧 **Validaciones**

- ✅ Verifica que el usuario solicitante existe
- ✅ Verifica que la dependencia existe y está activa
- ✅ Verifica que la sede existe y está activa
- ✅ Verifica que la categoría existe y está activa (si se proporciona)
- ✅ Verifica que la subcategoría existe y está activa (si se proporciona)
- ✅ Verifica que el técnico existe y está activo (si se proporciona)

## 🎉 **¡Módulo Completamente Actualizado!**

El módulo de tickets ahora usa relaciones con IDs para categorías y subcategorías, eliminando los enums y proporcionando mayor flexibilidad para gestionar estas entidades de forma independiente.
