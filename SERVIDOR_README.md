# 🚀 Servidor SIGETIC Backend

Este archivo contiene los scripts necesarios para ejecutar tu aplicación NestJS SIGETIC.

## 📋 Archivos Creados

- `server.js` - Servidor principal con múltiples comandos
- `start-dev.js` - Script rápido para desarrollo
- `start-prod.js` - Script rápido para producción
- `env.example` - Archivo de ejemplo para variables de entorno

## 🚀 Formas de Ejecutar el Servidor

### 1. Usando el servidor principal (Recomendado)

```bash
# Modo desarrollo (con hot reload)
node server.js dev

# Modo producción
node server.js start

# Solo compilar
node server.js build

# Ver ayuda
node server.js help
```

### 2. Usando scripts rápidos

```bash
# Desarrollo
node start-dev.js

# Producción
node start-prod.js
```

### 3. Usando npm scripts (originales)

```bash
# Desarrollo
npm run start:dev

# Producción
npm run start:prod

# Compilar
npm run build
```

## ⚙️ Configuración

### Variables de Entorno

Copia el archivo `env.example` a `.env` y configura tus variables:

```bash
cp env.example .env
```

Edita el archivo `.env` con tus configuraciones:

```env
# Base de Datos
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=tu_base_datos

# Servidor
PORT=5000
HOST=localhost
NODE_ENV=development

# JWT
JWT_SECRET=tu_jwt_secret_seguro
JWT_EXPIRES_IN=24h
```

## 🔧 Características del Servidor

### ✅ Funcionalidades Automáticas

- **Instalación automática de dependencias** si no existen
- **Compilación automática** del proyecto TypeScript
- **Manejo de señales** para terminación limpia
- **Configuración de entorno** automática
- **Logs informativos** con emojis
- **Manejo de errores** robusto

### 🎯 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `start` | Inicia en modo producción |
| `dev` | Inicia en modo desarrollo |
| `build` | Solo compila el proyecto |
| `help` | Muestra la ayuda |

### 🌍 Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `PORT` | Puerto del servidor | 5000 |
| `HOST` | Host del servidor | localhost |
| `NODE_ENV` | Entorno de ejecución | development |
| `DB_HOST` | Host de la base de datos | localhost |
| `DB_PORT` | Puerto de la base de datos | 3306 |
| `DB_USERNAME` | Usuario de la base de datos | - |
| `DB_PASSWORD` | Contraseña de la base de datos | - |
| `DB_NAME` | Nombre de la base de datos | - |

## 🚨 Solución de Problemas

### Error: "El proyecto no está compilado"
```bash
# Solución 1: Compilar manualmente
npm run build

# Solución 2: Usar el servidor automático
node server.js build
```

### Error: "Dependencias no instaladas"
```bash
# Instalar dependencias
npm install

# O usar el servidor automático (lo hace automáticamente)
node server.js start
```

### Error: "Puerto en uso"
```bash
# Cambiar puerto
PORT=3000 node server.js start

# O configurar en .env
echo "PORT=3000" >> .env
```

### Error: "Base de datos no conecta"
1. Verifica que MySQL esté ejecutándose
2. Verifica las credenciales en `.env`
3. Verifica que la base de datos exista
4. Verifica la conexión de red

## 📊 Logs del Servidor

El servidor muestra logs informativos:

```
🚀 Iniciando servidor SIGETIC...
📁 Directorio: /ruta/del/proyecto
🌍 Entorno: development
🔌 Puerto: 5000
🏠 Host: localhost
📦 Instalando dependencias...
✅ Dependencias instaladas
🔨 Compilando proyecto...
✅ Compilación exitosa
🎯 Iniciando aplicación NestJS...
```

## 🔄 Flujo de Trabajo Recomendado

### Para Desarrollo
1. `node server.js dev` - Inicia con hot reload
2. Realiza cambios en el código
3. Los cambios se reflejan automáticamente

### Para Producción
1. `node server.js build` - Compila el proyecto
2. `node server.js start` - Inicia en modo producción
3. O usa `node start-prod.js` directamente

## 🆘 Soporte

Si tienes problemas:

1. Verifica que Node.js esté instalado
2. Verifica que npm esté funcionando
3. Verifica la configuración de la base de datos
4. Revisa los logs de error
5. Usa `node server.js help` para ver opciones

## 📝 Notas

- El servidor automáticamente instala dependencias si es necesario
- El servidor automáticamente compila el proyecto si es necesario
- Los cambios en modo desarrollo se reflejan automáticamente
- El servidor maneja señales de terminación correctamente
- Todas las configuraciones se pueden sobrescribir con variables de entorno
