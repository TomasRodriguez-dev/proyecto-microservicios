import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppDataSource } from './typeorm.config';

async function bootstrap() {
  // DB
  await AppDataSource.initialize();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: { port: +(process.env.PORT ?? 3002) },
  });
  await app.listen();
}
bootstrap();
