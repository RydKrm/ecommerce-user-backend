import { TokenService } from './../../common/services/jwt.service';
import { PrismaService } from './../../prisma/prisma.service';
import { AuthGuard } from './../../common/grad/auth.guard';
import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [StoreController],
  providers: [StoreService, AuthGuard, PrismaService, JwtService],
})
export class StoreModule {}
