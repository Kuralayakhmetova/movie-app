import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './utils/swagger.util';
import { DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);

app.use(cookieParser());

 app.enableCors({
   origin: 'http://localhost:3001', // адрес Next.js
   credentials: true, // ОБЯЗАТЕЛЬНО — иначе cookies не работают
 });



  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

   setupSwagger(app);


 await app.listen(process.env.PORT || 3000); // NestJS остаётся на 3000 порту


  const config = new DocumentBuilder()
    .setTitle('Movie API')
    .setDescription('API для управления фильмами и отзывами')
    .setVersion('1.0.0')
    .addTag('movies')
    .addTag('reviews')
    .addTag('users')
    .build();


  await app.listen(3000);
}
bootstrap();