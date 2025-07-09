import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HealthStatusDto } from './dto/health-status.dto';

@ApiTags('Application')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get a greeting message' })
  @ApiOkResponse({
    description: 'Returns a greeting string.',
    schema: {
      type: 'string',
      example: 'Hello World!',
    },
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  @ApiOperation({ summary: 'Get application health status' })
  @ApiOkResponse({
    description: 'Returns health status, uptime, and timestamp of the server.',
    type: HealthStatusDto,
  })
  getHealth(): HealthStatusDto {
    return this.appService.getHealth();
  }
}
