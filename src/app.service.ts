import { Injectable } from '@nestjs/common';
import { formatUptime } from './common/utils/format-uptime.util';
import { HealthStatusDto } from './dto/health-status.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHealth(): HealthStatusDto {
    return {
      status: 'ok',
      uptime: formatUptime(process.uptime()),
      timestamp: new Intl.DateTimeFormat('default', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(new Date()),
    };
  }
}
