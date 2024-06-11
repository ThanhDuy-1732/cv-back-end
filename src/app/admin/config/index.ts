// Utilities
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const databaseModules = [
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => {
      const isSync = configService.get('PG_SYNC') === 'true';

      return {
        type: 'postgres',
        synchronize: isSync,
        host: configService.get('PG_HOST'),
        port: +configService.get('PG_PORT'),
        username: configService.get('PG_USER'),
        password: configService.get('PG_PASSWORD'),
        database: configService.get('PG_DATABASE'),
        entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
      };
    },
  }),
];

export const cacheModules = [
  CacheModule.registerAsync({
    isGlobal: true,
    inject: [ConfigService],
    imports: [ConfigModule],

    useFactory: (configService: ConfigService) => {
      return {
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        ttl: Number(configService.get('REDIS_TTL')),
      };
    },
  }),
];

export const queueModules = [
  BullModule.forRootAsync({
    inject: [ConfigService],
    imports: [ConfigModule],

    useFactory: async (configService: ConfigService) => ({
      redis: {
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
      },
    }),
  }),
];
