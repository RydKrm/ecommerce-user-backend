import { Test, TestingModule } from '@nestjs/testing';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../../common/decorator/auth.decorator';
import { Reflector } from '@nestjs/core';

describe('StoreController', () => {
  let controller: StoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreController],
      providers: [
        { provide: StoreService, useValue: {} },
        { provide: JwtService, useValue: {} },
        { provide: AuthGuard, useValue: {} },
        { provide: Reflector, useValue: {} },
      ],
    }).compile();

    controller = module.get<StoreController>(StoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
