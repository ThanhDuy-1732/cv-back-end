// Utilities
import * as process from 'process';
import { NestFactory } from '@nestjs/core';

// Modules
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
