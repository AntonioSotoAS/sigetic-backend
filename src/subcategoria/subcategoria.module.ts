import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SubcategoriaService } from './subcategoria.service'
import { SubcategoriaController } from './subcategoria.controller'
import { Subcategoria } from './entities/subcategoria.entity'
import { Categoria } from '../categoria/entities/categoria.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Subcategoria, Categoria])],
  controllers: [SubcategoriaController],
  providers: [SubcategoriaService],
  exports: [SubcategoriaService],
})
export class SubcategoriaModule {}
