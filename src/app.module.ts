import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { MessagesModule } from './messages/messages.module'
import { UsersModule } from './users/users.module'
import { PrismaService } from './prisma/prisma.service'
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [MessagesModule, UsersModule],
  controllers: [AppController],
  providers: [ PrismaService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoggerMiddleware)
    .forRoutes("user")
  }
}
