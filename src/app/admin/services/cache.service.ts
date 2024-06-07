// Utilities
import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';

// Constants
import { CACHE_MANAGER } from '@nestjs/cache-manager';

export type Fallback = () => Promise<any>;

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async set(key: string, value: unknown, ttl?: number) {
    await this.cacheManager.set(key, value, ttl);
  }

  async get<T>(key: string, fallback?: Fallback): Promise<T | null> {
    const cachedValue = await this.cacheManager.get<T>(key);

    if (cachedValue) {
      return cachedValue;
    }

    if (!fallback) {
      return null;
    }

    const freshValue = await fallback();
    if (freshValue) {
      this.set(key, freshValue);
    }

    return freshValue;
  }

  async del(key: string) {
    await this.cacheManager.del(key);
  }
}
