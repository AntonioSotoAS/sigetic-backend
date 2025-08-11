import { Controller, Get } from '@nestjs/common'
import { SeedService } from './seed.service'

@Controller('seed')
// @UseGuards(JwtAuthGuard) // Comentado temporalmente para desarrollo
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  async seed() {
    return await this.seedService.seed()
  }
} 