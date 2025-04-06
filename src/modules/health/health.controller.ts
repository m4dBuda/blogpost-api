import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('/health')
  public async healthCheck() {
    return {
      status: 'ok',
    };
  }
}
