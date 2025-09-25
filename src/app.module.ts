import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UsuarioModule } from './usuario/usuario.module'
import { SeedModule } from './seed/seed.module'
import { CategoriaModule } from './categoria/categoria.module'
import { SubcategoriaModule } from './subcategoria/subcategoria.module'
import { TicketModule } from './ticket/ticket.module'
import { DependenciaModule } from './dependencia/dependencia.module'
import { SedeModule } from './sede/sede.module'
import { CargoModule } from './cargo/cargo.module'
import { RealtimeModule } from './realtime/realtime.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME || 'zodgiwxd_antonio',
      password: process.env.DB_PASSWORD || 'keQ%)pme#1g}^b)6',
      database: process.env.DB_NAME || 'zodgiwxd_sigetic',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
      //slogging: process.env.NODE_ENV !== 'production',
    }),

    AuthModule,
    UsuarioModule,
    SeedModule,
    CategoriaModule,
    SubcategoriaModule,
    TicketModule,
    DependenciaModule,
    SedeModule,
    CargoModule,
    RealtimeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
