import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { PrismaModule } from 'nestjs-prisma';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appConfig } from './config';
import { ImagesModule } from './image/image.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        // name: 'add some name to every JSON line',
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
        // and all the other fields of:
        // - https://github.com/pinojs/pino-http#api
        // - https://github.com/pinojs/pino/blob/HEAD/docs/api.md#options-object
      },
    }),
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    PrismaModule,
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
