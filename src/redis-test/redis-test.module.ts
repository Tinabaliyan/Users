import { Module } from '@nestjs/common';
import { RedisTestController } from './redis-test.controller';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [RedisTestController],
})
export class RedisTestModule {}
