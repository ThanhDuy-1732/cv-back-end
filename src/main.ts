// Utilities
import * as process from 'process';
import { NestFactory } from '@nestjs/core';
import { patchNestJsSwagger } from 'nestjs-zod';
import { MicroserviceOptions } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { grpcClientOptions } from 'src/app/core/grpc-client.options';

// Modules
import { AppCoreModule } from 'src/app/core/app.module';
import { AppAdminModule } from 'src/app/admin/app.module';
import { AppClientModule } from 'src/app/client/app.module';

async function clientBootstrap() {
  const app = await NestFactory.create(AppClientModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 10000);
}

async function adminBootstrap() {
  const app = await NestFactory.create(AppAdminModule);
  app.enableCors();

  patchNestJsSwagger();

  const documentConfig = new DocumentBuilder()
    .addBearerAuth()
    .setVersion('1.0')
    .setTitle('Admin API Gateway')
    .setDescription('Admin APIs description')
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('documents', app, document);

  await app.listen(process.env.PORT_ADMIN ?? 3001);
}

async function coreBootstrap() {
  const app = await NestFactory.create(AppCoreModule);
  app.enableCors();
  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);

  await app.startAllMicroservices();
  await app.listen(process.env.PORT_CORE ?? 3002);
}

async function bootstrap() {
  clientBootstrap();
  adminBootstrap();
  coreBootstrap();
}
bootstrap();
