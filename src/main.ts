import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SwaggerCustomOptions } from '@nestjs/swagger';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import { TransformResponseInterceptor } from './interceptors/transform-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformResponseInterceptor());

  // Configure session middleware
  app.use(
    session({
      secret: 'your_secret_key', // ใช้คีย์ลับของคุณ
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3600000, // 1 hour for example
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Title Example')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token', // นี่คือชื่อที่จะปรากฏใน Swagger UI
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'API Docs',
    swaggerOptions: {
      persistAuthorization: true, // Enable authorization persistence
    },
  };

  SwaggerModule.setup('api', app, document, customOptions);

  await app.listen(5001);
}
bootstrap();
