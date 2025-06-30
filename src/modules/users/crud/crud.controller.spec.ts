import { Test, TestingModule } from '@nestjs/testing';
import { CrudController } from './crud.controller';
import { CrudService } from './crud.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../../../common/decorator/auth.decorator';
import { Reflector } from '@nestjs/core';

describe('CrudController', () => {
  let controller: CrudController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrudController],
      providers: [
        { provide: CrudService, useValue: {} },
        { provide: JwtService, useValue: {} },
        { provide: AuthGuard, useValue: {} },
        { provide: Reflector, useValue: {} },
      ],
    }).compile();

    controller = module.get<CrudController>(CrudController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
