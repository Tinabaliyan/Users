import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class CronJobService {
  private readonly logger = new Logger(CronJobService.name);

  constructor(
    @InjectQueue('message-queue')
    private messageQueue: Queue,
  ) {}

  @Cron('*/1 * * * * *') // Every 1 second
  async handleCron() {
    const timestamp = new Date().toISOString();
    const message = {
      id: Date.now(),
      message: 'Cron job executed successfully',
      timestamp,
      status: 'success',
    };

    try {
      // Add message to queue
      await this.messageQueue.add('process-message', message, {
        delay: 0,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
      });

      this.logger.log(`Cron job executed at ${timestamp}`);
    } catch (error) {
      this.logger.error(`Failed to add message to queue: ${error.message}`);
    }
  }

  // Method to manually trigger the cron job
  async triggerManualExecution() {
    const timestamp = new Date().toISOString();
    const message = {
      id: Date.now(),
      message: 'Manual cron job execution',
      timestamp,
      status: 'success',
    };

    try {
      await this.messageQueue.add('process-message', message);
      this.logger.log(`Manual cron job triggered at ${timestamp}`);
      return { success: true, message: 'Cron job triggered successfully' };
    } catch (error) {
      this.logger.error(`Failed to trigger manual cron job: ${error.message}`);
      return { success: false, message: 'Failed to trigger cron job' };
    }
  }

  // Get queue statistics
  async getQueueStats() {
    try {
      const waiting = await this.messageQueue.getWaiting();
      const active = await this.messageQueue.getActive();
      const completed = await this.messageQueue.getCompleted();
      const failed = await this.messageQueue.getFailed();

      return {
        waiting: waiting.length,
        active: active.length,
        completed: completed.length,
        failed: failed.length,
        total:
          waiting.length + active.length + completed.length + failed.length,
      };
    } catch (error) {
      this.logger.error(`Failed to get queue stats: ${error.message}`);
      return null;
    }
  }
}
