import { Test, TestingModule } from '@nestjs/testing';
import { SellerService } from './seller.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { TokenService } from '../../../common/services/jwt.service';
import { JwtService } from '@nestjs/jwt';

describe('SellerService', () => {
  let service: SellerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SellerService,
        { provide: PrismaService, useValue: {} },
        { provide: TokenService, useValue: {} },
        JwtService,
      ],
    }).compile();

    service = module.get<SellerService>(SellerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
