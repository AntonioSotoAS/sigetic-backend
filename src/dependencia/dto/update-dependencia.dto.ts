import { PartialType } from '@nestjs/swagger'
import { CreateDependenciaDto } from './create-dependencia.dto'

export class UpdateDependenciaDto extends PartialType(CreateDependenciaDto) {}
