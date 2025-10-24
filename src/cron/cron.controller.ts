import { Controller, Get, Post, HttpStatus, HttpCode } from '@nestjs/common';
import { CronJobService } from './cron-job.service';

@Controller('cron')
export class CronController {
  constructor(private readonly cronJobService: CronJobService) {}

  @Post('trigger')
  @HttpCode(HttpStatus.OK)
  async triggerCronJob() {
    return await this.cronJobService.triggerManualExecution();
  }

  @Get('stats')
  async getQueueStats() {
    const stats = await this.cronJobService.getQueueStats();
    return {
      success: true,
      data: stats,
      message: 'Queue statistics retrieved successfully',
    };
  }

  @Get('status')
  async getCronStatus() {
    return {
      success: true,
      message: 'Cron job is running every 1 second',
      cronExpression: '*/1 * * * * *',
      description: 'Executes every second and adds messages to the queue',
    };
  }
}
