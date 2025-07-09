import { ApiProperty } from '@nestjs/swagger';

export class HealthStatusDto {
  @ApiProperty({ example: 'ok', description: 'Application health status' })
  status: string;

  @ApiProperty({
    example: '01h 23m 45s',
    description: 'Formatted application uptime',
  })
  uptime: string;

  @ApiProperty({
    example: '07/08/2025, 14:25:30',
    description: 'Current timestamp of the server',
  })
  timestamp: string;
}
