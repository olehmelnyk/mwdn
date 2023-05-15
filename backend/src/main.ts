import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { PrismaService, PrismaClientExceptionFilter } from 'nestjs-prisma';

import { E_TOO_MANY_REQUESTS } from './common/exceptions';
import { APP_DESCRIPTION, APP_NAME, APP_VERSION } from './common/constants';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: true,
  });
  const config = app.get(ConfigService);

  app.use(helmet());

  app.use(
    rateLimit({
      windowMs: 10 * 60 * 1000, // 10 minutes
      max: 100, // Limit each IP to 100 requests per `window` (here, per 10 minutes)
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
      skipSuccessfulRequests: false, // The counting will skip all successful requests and just count the errors. Instead of removing rate-limiting, it's better to set this to true to limit the number of times a request fails. Can help prevent against brute-force attacks
      message: { message: E_TOO_MANY_REQUESTS, statusCode: 403 },
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  app.useLogger(app.get(Logger));

  const swaggerConfig = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(APP_DESCRIPTION)
    .setVersion(APP_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // enable shutdown hook for prisma
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(config.get('app.port'));
}

bootstrap();
