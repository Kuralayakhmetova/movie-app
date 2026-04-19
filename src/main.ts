import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './utils/swagger.util';
import { DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { filter } from 'rxjs/internal/operators/filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);

app.use(cookieParser());



 const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:3001', 
 
  ].filter(Boolean);

  app.enableCors({
origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
  if (!origin || allowedOrigins.includes(origin)) {
    callback(null, true);
  } else {
    callback(new Error('Not allowed by CORS'));
  }
},
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
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


 
}
bootstrap();