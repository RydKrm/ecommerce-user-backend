import { Module } from '@nestjs/common';
import { SellerService } from './crud/seller.service';
import { SellerController } from './crud/seller.controller';
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardService } from './dashboard/dashboard.service';
import { TokenService } from '../../common/services/jwt.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [SellerService, DashboardService,TokenService, PrismaService, JwtService],
  controllers: [SellerController, DashboardController]
})
export class SellerModule {}
