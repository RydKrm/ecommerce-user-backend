import { Test, TestingModule } from '@nestjs/testing';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../../../common/decorator/auth.decorator';
import { Reflector } from '@nestjs/core';

describe('SellerController', () => {
  let controller: SellerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SellerController],
      providers: [
        { provide: SellerService, useValue: {} },
        { provide: JwtService, useValue: {} },
        { provide: AuthGuard, useValue: {} },
        { provide: Reflector, useValue: {} },
      ],
    }).compile();

    controller = module.get<SellerController>(SellerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
