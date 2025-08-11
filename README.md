# 🚀 SIGETIC Backend API

Sistema de Gestión de Tickets (SIGETIC) - Backend API desarrollado con NestJS

## 📋 Descripción

SIGETIC es una API RESTful para la gestión integral de tickets de soporte técnico, usuarios, categorías y dependencias. Desarrollada con NestJS, TypeORM y MySQL, proporciona un sistema completo de autenticación y autorización basado en roles.

## 🛠️ Tecnologías Utilizadas

- **Framework**: NestJS 11.x
- **Base de Datos**: MySQL 8.x
- **ORM**: TypeORM
- **Autenticación**: JWT (JSON Web Tokens)
- **Validación**: class-validator, class-transformer
- **Documentación**: Swagger/OpenAPI
- **Lenguaje**: TypeScript
- **Encriptación**: bcryptjs
- **Tiempo Real**: Socket.IO con autenticación JWT

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (v18 o superior)
- MySQL 8.x
- npm o yarn

### Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd sigetic-backend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
Crear un archivo `.env` en la raíz del proyecto:
```env
# Base de Datos
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=tu_password
DB_NAME=nest_sigetic

# JWT
JWT_SECRET=tu-secreto-jwt-super-seguro

# Entorno
NODE_ENV=development
```

4. **Crear la base de datos**
```sql
CREATE DATABASE nest_sigetic;
```

5. **Ejecutar la aplicación**

**Desarrollo:**
```bash
npm run start:dev
```

**Producción:**
```bash
npm run build
npm run start:prod
```

La API estará disponible en: `http://localhost:3001`

## 📚 Estructura de la API

### Prefijo Global
Todas las rutas tienen el prefijo: `/api/v1`

### Autenticación
La API utiliza JWT (JSON Web Tokens) para la autenticación. Incluye el token en el header:
```
Authorization: Bearer <token>
```

## 🔐 Módulo de Autenticación (`/auth`)

### Endpoints

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| `POST` | `/auth/login` | Iniciar sesión | No requerida |
| `POST` | `/auth/logout` | Cerrar sesión | No requerida |
| `GET` | `/auth/perfil` | Obtener perfil del usuario | Requerida |
| `POST` | `/auth/refresh` | Renovar access token | No requerida |

### Cookies Configuradas
- `access_token`: Token de acceso (15 minutos)
- `refresh_token`: Token de renovación (7 días)
- `token`: Token para Socket.IO (15 minutos)

### Ejemplo de Login
```json
POST /api/v1/auth/login
{
  "correo": "usuario@ejemplo.com",
  "password": "password123"
}
```

## 👥 Módulo de Usuarios (`/usuarios`)

### Endpoints

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| `GET` | `/usuarios` | Listar usuarios (con filtros) | Requerida |
| `GET` | `/usuarios/:id` | Obtener usuario por ID | Requerida |
| `POST` | `/usuarios` | Crear nuevo usuario | No requerida |
| `PATCH` | `/usuarios/:id` | Actualizar usuario | Requerida |
| `DELETE` | `/usuarios/:id` | Eliminar usuario | Requerida |
| `GET` | `/usuarios/:id/roles-visibles` | Obtener roles visibles | Requerida |

### Filtros Disponibles
- `limit`: Número de registros por página
- `offset`: Registros a saltar
- `page`: Número de página
- `search`: Búsqueda por nombre o correo
- `rol`: Filtro por rol de usuario

### Roles de Usuario
- `ADMIN`: Administrador del sistema
- `TECNICO`: Técnico de soporte
- `USUARIO`: Usuario final

## 🎫 Módulo de Tickets (`/tickets`)

### Endpoints

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| `GET` | `/tickets` | Listar tickets (con filtros) | Requerida |
| `GET` | `/tickets/sin-asignar` | Tickets sin asignar | Requerida |
| `GET` | `/tickets/mis-tickets` | Mis tickets asignados | Requerida |
| `GET` | `/tickets/asignados/:tecnicoId` | Tickets asignados a un técnico | Requerida |
| `GET` | `/tickets/:id` | Obtener ticket por ID | Requerida |
| `POST` | `/tickets` | Crear nuevo ticket | Requerida |
| `PATCH` | `/tickets/:id` | Actualizar ticket | Requerida |
| `DELETE` | `/tickets/:id` | Eliminar ticket | Requerida |

### Estados de Ticket
- `PENDIENTE`: Ticket creado, pendiente de asignación
- `ASIGNADO`: Ticket asignado a un técnico
- `EN_PROCESO`: Ticket en proceso de resolución
- `RESUELTO`: Ticket resuelto
- `CERRADO`: Ticket cerrado

## 📂 Módulo de Categorías (`/categorias`)

### Endpoints

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| `GET` | `/categorias` | Listar categorías (con filtros) | Requerida |
| `GET` | `/categorias/active` | Listar categorías activas | Requerida |
| `GET` | `/categorias/:id` | Obtener categoría por ID | Requerida |
| `POST` | `/categorias` | Crear nueva categoría | Requerida |
| `PATCH` | `/categorias/:id` | Actualizar categoría | Requerida |
| `DELETE` | `/categorias/:id` | Eliminar categoría | Requerida |

## 📁 Módulo de Subcategorías (`/subcategorias`)

### Endpoints

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| `GET` | `/subcategorias` | Listar subcategorías (con filtros) | Requerida |
| `GET` | `/subcategorias/:id` | Obtener subcategoría por ID | Requerida |
| `POST` | `/subcategorias` | Crear nueva subcategoría | Requerida |
| `PATCH` | `/subcategorias/:id` | Actualizar subcategoría | Requerida |
| `DELETE` | `/subcategorias/:id` | Eliminar subcategoría | Requerida |

## 🏢 Módulo de Dependencias (`/dependencias`)

### Endpoints

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| `GET` | `/dependencias` | Listar dependencias (con filtros) | Requerida |
| `GET` | `/dependencias/:id` | Obtener dependencia por ID | Requerida |
| `POST` | `/dependencias` | Crear nueva dependencia | Requerida |
| `PATCH` | `/dependencias/:id` | Actualizar dependencia | Requerida |
| `DELETE` | `/dependencias/:id` | Eliminar dependencia | Requerida |

## 🏛️ Módulo de Sedes (`/sedes`)

### Endpoints

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| `GET` | `/sedes` | Listar sedes (con filtros) | Requerida |
| `GET` | `/sedes/:id` | Obtener sede por ID | Requerida |
| `POST` | `/sedes` | Crear nueva sede | Requerida |
| `PATCH` | `/sedes/:id` | Actualizar sede | Requerida |
| `DELETE` | `/sedes/:id` | Eliminar sede | Requerida |

## 🌱 Módulo de Seed (`/seed`)

### Endpoints

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| `POST` | `/seed` | Ejecutar seed de datos iniciales | Requerida |

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run start:dev          # Ejecutar en modo desarrollo con hot reload
npm run start:debug        # Ejecutar en modo debug

# Producción
npm run build              # Compilar el proyecto
npm run start:prod         # Ejecutar en modo producción

# Testing
npm run test               # Ejecutar tests unitarios
npm run test:watch         # Ejecutar tests en modo watch
npm run test:cov           # Ejecutar tests con cobertura
npm run test:e2e           # Ejecutar tests end-to-end

# Linting y Formateo
npm run lint               # Ejecutar ESLint
npm run format             # Formatear código con Prettier
```

## 🔒 Seguridad

### Autenticación JWT
- **Access Token**: Expira en 15 minutos
- **Refresh Token**: Expira en 7 días
- **Cookies HttpOnly**: Configuradas automáticamente en login
- **Compatibilidad**: Soporta cookies, headers y query params
- **Validación automática**: En endpoints protegidos

### Validación de Datos
- Validación automática con class-validator
- Sanitización de datos de entrada
- Transformación automática de tipos

### CORS
- Configurado para permitir peticiones desde `http://localhost:3000`
- Métodos permitidos: GET, POST, PUT, DELETE, PATCH, OPTIONS
- Headers permitidos: Content-Type, Authorization

### WebSockets (Socket.IO)
- **Namespace**: `/realtime`
- **Autenticación**: JWT en handshake
- **Salas disponibles**:
  - `user:{userId}` - Sala personal del usuario
  - `tecnico:{userId}` - Sala para técnicos
  - `sede:{sedeId}` - Sala de la sede
  - `ticket:{ticketId}` - Sala específica del ticket
  - `tickets:unassigned` - Sala para tickets sin asignar

## 📊 Base de Datos

### Entidades Principales
- **Usuario**: Gestión de usuarios y roles
- **Ticket**: Tickets de soporte técnico
- **Categoria**: Categorías de tickets
- **Subcategoria**: Subcategorías de tickets
- **Dependencia**: Dependencias organizacionales
- **Sede**: Sedes físicas
- **ComentarioTicket**: Comentarios en tickets

### Relaciones
- Usuario → Ticket (creador, asignado)
- Categoria → Subcategoria (uno a muchos)
- Ticket → Categoria, Subcategoria, Dependencia, Sede
- Ticket → ComentarioTicket (uno a muchos)

## 🚀 Despliegue

### Variables de Entorno de Producción
```env
NODE_ENV=production
DB_HOST=tu_host_produccion
DB_PORT=3306
DB_USERNAME=tu_usuario_db
DB_PASSWORD=tu_password_db
DB_NAME=sigetic_prod
JWT_SECRET=secreto_super_seguro_produccion
```

### Comandos de Despliegue
```bash
# Instalar dependencias de producción
npm ci --only=production

# Compilar
npm run build

# Ejecutar
npm run start:prod
```

## 📝 Documentación API

La documentación interactiva de la API está disponible en:
- **Swagger UI**: `http://localhost:3001/api/v1/docs` (cuando esté configurado)

## 🔌 Eventos Socket.IO

### Eventos Emitidos por el Servidor

| Evento | Descripción | Payload |
|--------|-------------|---------|
| `ticket.created` | Nuevo ticket creado | `{ id, titulo, prioridad, estado, created_at, user, dependencia }` |
| `ticket.updated` | Ticket actualizado | `{ id, titulo, estado, tecnico }` |
| `ticket.assigned` | Ticket asignado a técnico | `{ id, titulo, prioridad, estado, user }` |
| `ticket.status_changed` | Estado de ticket cambiado | `{ id, estado, updated_at }` |
| `tickets:unassigned` | Actualización de tickets sin asignar | `{ action, ticket }` |

### Conexión desde Frontend

```javascript
import io from 'socket.io-client'

const socket = io('http://localhost:3001/realtime', {
  auth: {
    token: 'tu-jwt-token'
  }
})

socket.on('ticket.created', (data) => {
  console.log('Nuevo ticket:', data)
})
```

Ver archivo `frontend-socket-example.js` para ejemplo completo.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia UNLICENSED.

## 👨‍💻 Autor

Desarrollado para el Sistema de Gestión de Tickets (SIGETIC)

---

**Nota**: Este README se actualiza automáticamente según la estructura actual del proyecto. Para más información sobre endpoints específicos, consulta la documentación de Swagger o los controladores correspondientes.
# sigetic-backend
