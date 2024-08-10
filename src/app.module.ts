import { SellerModule } from './modules/seller/seller.module';
import { MessagesModule } from './modules/messages/messages.module';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { PrismaService } from './prisma/prisma.service'
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { UsersModule } from './modules/users/users.module';
import { SellerController } from './modules/seller/crud/seller.controller';

@Module({
  imports: [MessagesModule, UsersModule, SellerModule],
  controllers: [AppController, SellerController],
  providers: [ PrismaService,],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoggerMiddleware)
    .forRoutes("user")
  }
}
