import { Test, TestingModule } from '@nestjs/testing';
import { OrderPolicyService } from './order-policy.service';

describe('OrderPolicyService', () => {
  let service: OrderPolicyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderPolicyService],
    }).compile();

    service = module.get<OrderPolicyService>(OrderPolicyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
