export class UpdateLocationResponseDto {
  message: string
  success: boolean
  user?: {
    id: number
    sede_id?: number
    dependencia_id?: number
  }
} 