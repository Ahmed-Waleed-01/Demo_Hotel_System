import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //use global validation pipes for ensuring dto matching and transformation.
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Ensures DTO transformations are applied
     }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
