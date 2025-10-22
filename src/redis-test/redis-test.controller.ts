import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Controller('redis-test')
export class RedisTestController {
  constructor(private readonly redisService: RedisService) {}

  @Post('set')
  async setValue(@Body() body: { key: string; value: any; ttl?: number }) {
    await this.redisService.set(body.key, body.value, body.ttl);
    return { message: 'Value set successfully', key: body.key };
  }

  @Get('get/:key')
  async getValue(@Param('key') key: string) {
    const value = await this.redisService.get(key);
    return { key, value };
  }

  @Get('status')
  async getStatus() {
    try {
      await this.redisService.set('health-check', 'OK', 60);
      const status = await this.redisService.get('health-check');
      return { 
        status: 'Redis is working!', 
        healthCheck: status,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return { 
        status: 'Redis error', 
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
}
