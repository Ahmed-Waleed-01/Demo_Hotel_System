import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
