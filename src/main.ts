// src/main.ts
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { JwtWsAdapter } from './realtime/jwt-ws.adapter'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigService)
  const jwt = app.get(JwtService)

  // Configurar CORS para permitir peticiones desde cualquier origen
  app.enableCors({
    origin: true, // Permite cualquier origen
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization', 
      'x-user-id',
      'x-requested-with',
      'accept',
      'origin',
      'access-control-request-method',
      'access-control-request-headers'
    ],
    exposedHeaders: ['set-cookie'],
  })

  // Configurar cookie-parser
  app.use(cookieParser())

  // Configurar prefijo global para todas las rutas
  app.setGlobalPrefix('api/v1')

  // Configurar WebSocket adapter con autenticación JWT
  app.useWebSocketAdapter(new JwtWsAdapter(app, config, jwt))

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades que no están en el DTO
      forbidNonWhitelisted: true, // Lanza error si envían propiedades no válidas
      transform: true, // Transforma automáticamente tipos con class-transformer
    }),
  )

  await app.listen(5000)
}
bootstrap()
