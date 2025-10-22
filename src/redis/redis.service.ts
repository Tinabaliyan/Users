import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get<T>(key: string): Promise<T | undefined> {
    return await this.cacheManager.get<T>(key);
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  async del(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async reset(): Promise<void> {
    // Note: reset method might not be available in all cache implementations
    // This is a placeholder - you might need to implement cache clearing differently
    console.log('Cache reset requested - implementation depends on cache store');
  }

  // User-specific caching methods
  async cacheUser(userId: number, userData: any, ttl: number = 300): Promise<void> {
    await this.set(`user:${userId}`, userData, ttl);
  }

  async getCachedUser(userId: number): Promise<any> {
    return await this.get(`user:${userId}`);
  }

  async invalidateUser(userId: number): Promise<void> {
    await this.del(`user:${userId}`);
  }

  // Blog-specific caching methods
  async cacheBlog(blogId: number, blogData: any, ttl: number = 300): Promise<void> {
    await this.set(`blog:${blogId}`, blogData, ttl);
  }

  async getCachedBlog(blogId: number): Promise<any> {
    return await this.get(`blog:${blogId}`);
  }

  async invalidateBlog(blogId: number): Promise<void> {
    await this.del(`blog:${blogId}`);
  }

  // Session caching
  async cacheSession(sessionId: string, sessionData: any, ttl: number = 3600): Promise<void> {
    await this.set(`session:${sessionId}`, sessionData, ttl);
  }

  async getCachedSession(sessionId: string): Promise<any> {
    return await this.get(`session:${sessionId}`);
  }

  async invalidateSession(sessionId: string): Promise<void> {
    await this.del(`session:${sessionId}`);
  }
}
