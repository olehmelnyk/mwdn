import { Module } from '@nestjs/common';

import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';

import { ImagesService } from './image.service';
import { ImagesController } from './image.controller';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService],
  imports: [
    PrismaModule.forRoot({
      prismaServiceOptions: {
        middlewares: [loggingMiddleware()],
      },
    }),
  ],
})
export class ImagesModule {}
