import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { CrudController } from './crud/crud.controller';
import { CrudRepository } from './crud/crud.repository';
import { CrudService } from './crud/crud.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { TokenService } from '../../common/services/jwt.service';

@Module({
  controllers: [AuthController, CrudController],
  providers:[CrudRepository, CrudService, PrismaService, TokenService, JwtService]
})
export class UsersModule {}
