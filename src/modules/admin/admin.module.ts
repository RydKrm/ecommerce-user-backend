import { PrismaService } from './../../prisma/prisma.service';
import { TokenService } from './../../common/services/jwt.service';
import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AdminController],
  providers: [AdminService,TokenService, PrismaService,JwtService],
})
export class AdminModule {}
