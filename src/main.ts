import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loadEnvironment } from './config/enviroment.config';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  loadEnvironment();
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  await app.listen(3000);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
}
bootstrap();
