// Utilities
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Controller
import { AppController } from './app.controller';

// Services
import { AppService } from './app.service';

// Config
import { mongodbDatabaseModule } from './config/index';

@Module({
  imports: [...mongodbDatabaseModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppClientModule {}
