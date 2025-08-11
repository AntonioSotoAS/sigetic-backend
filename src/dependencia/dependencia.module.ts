import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DependenciaService } from './dependencia.service'
import { DependenciaController } from './dependencia.controller'
import { Dependencia } from './entities/dependencia.entity'
import { Sede } from '../sede/entities/sede.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Dependencia, Sede])],
  controllers: [DependenciaController],
  providers: [DependenciaService],
  exports: [DependenciaService],
})
export class DependenciaModule {}
