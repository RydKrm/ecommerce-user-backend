import { SellerModule } from './modules/seller/seller.module';
import { MessagesModule } from './modules/messages/messages.module';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { PrismaService } from './prisma/prisma.service'
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { UsersModule } from './modules/users/users.module';
import { SellerController } from './modules/seller/crud/seller.controller';
import { JwtService } from '@nestjs/jwt';
import { AdminModule } from './modules/admin/admin.module';
import { StoreModule } from './modules/store/store.module';

@Module({
  imports: [MessagesModule, UsersModule, SellerModule, AdminModule, StoreModule],
  controllers: [AppController, SellerController],
  providers: [ PrismaService,JwtService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoggerMiddleware)
    .forRoutes("user")
  }
}
