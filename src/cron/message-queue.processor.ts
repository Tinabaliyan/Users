import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor('message-queue')
export class MessageQueueProcessor extends WorkerHost {
  private readonly logger = new Logger(MessageQueueProcessor.name);

  async process(job: Job<any>): Promise<any> {
    const { data } = job;

    try {
      this.logger.log(`Processing message: ${JSON.stringify(data)}`);

      // Simulate some processing time
      await new Promise(resolve => setTimeout(resolve, 100));

      const result = {
        ...data,
        processedAt: new Date().toISOString(),
        processedBy: 'MessageQueueProcessor',
      };

      this.logger.log(`Message processed successfully: ${result.id}`);

      return result;
    } catch (error) {
      this.logger.error(
        `Failed to process message ${data.id}: ${error.message}`,
      );
      throw error;
    }
  }
}
