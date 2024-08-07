import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { CrudController } from './crud/crud.controller';
import { CrudRepository } from './crud/crud.repository';
import { CrudService } from './crud/crud.service';

@Module({
  controllers: [AuthController, CrudController],
  providers:[CrudRepository, CrudService]
})
export class UsersModule {}
