// Utilities
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Services
import { JwtStrategy } from './services/jwt.strategy';
import { AuthService } from './services/auth.service';
import { CacheService } from 'src/app/admin/services/cache.service';
import { RefreshJwtStrategy } from './services/refresh-jwt.strategy';
import { BcryptService } from 'src/app/admin/services/bcrypt.service';

// Controllers
import { AuthController } from './controllers/auth.controller';

// Entities
import { User } from 'src/app/admin/entities/user.entity';
import { Session } from 'src/app/admin/entities/session.entity';

// Queues
import { SessionConsumer } from 'src/app/admin/queues/sessionQueue.consumer';
import { SessionQueueProducer } from 'src/app/admin/queues/sessionQueue.producer';

// Modules
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/app/admin/modules/user/user.module';
import { CryptoService } from 'src/app/admin/services/crypto.service';
import { EventModule } from 'src/app/admin/modules/event/event.module';

// Constants
import { QUEUES } from '../../constants/queue';

@Module({
  exports: [AuthService],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    CacheService,
    BcryptService,
    ConfigService,
    CryptoService,
    RefreshJwtStrategy,

    // Queues
    SessionConsumer,
    SessionQueueProducer,
  ],
  imports: [
    UserModule,
    EventModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRE_IN'),
        },
      }),
    }),
    TypeOrmModule.forFeature([User, Session]),
    BullModule.registerQueue({ name: QUEUES.SESSION }),
  ],
})
export class AuthModule {}
