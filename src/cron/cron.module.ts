import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { CronController } from './cron.controller';
import { CronJobService } from './cron-job.service';
import { MessageQueueProcessor } from './message-queue.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'message-queue',
    }),
  ],
  controllers: [CronController],
  providers: [CronJobService, MessageQueueProcessor],
  exports: [CronJobService],
})
export class CronModule {}
