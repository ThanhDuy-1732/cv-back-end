// Utilities
import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Controllers
import { AppController } from './controllers/app.controller';

// Services
import { AppService } from './services/app.service';

// Modules
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { EventModule } from './modules/event/event.module';
import { databaseModules, cacheModules, queueModules } from './config/index';

@Module({
  providers: [AppService],
  controllers: [AppController],
  imports: [
    ...cacheModules,
    ...queueModules,
    ...databaseModules,

    AuthModule,
    UserModule,
    EventModule,
    ConfigModule.forRoot(),
  ],
})
export class AppAdminModule {
  constructor(private dataSource: DataSource) {}
}
