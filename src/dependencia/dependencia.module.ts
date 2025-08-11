import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DependenciaService } from './dependencia.service'
import { DependenciaController } from './dependencia.controller'
import { Dependencia } from './entities/dependencia.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Dependencia])],
  controllers: [DependenciaController],
  providers: [DependenciaService],
  exports: [DependenciaService],
})
export class DependenciaModule {}
