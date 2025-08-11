import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { Usuario } from './entities/usuario.entity';
import { Cargo } from '../cargo/entities/cargo.entity';
import { Dependencia } from '../dependencia/entities/dependencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Cargo, Dependencia])],
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports: [UsuarioService]
})
export class UsuarioModule {}
