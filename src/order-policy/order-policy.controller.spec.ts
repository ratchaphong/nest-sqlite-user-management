import { Test, TestingModule } from '@nestjs/testing';
import { OrderPolicyController } from './order-policy.controller';
import { OrderPolicyService } from './order-policy.service';

describe('OrderPolicyController', () => {
  let controller: OrderPolicyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderPolicyController],
      providers: [OrderPolicyService],
    }).compile();

    controller = module.get<OrderPolicyController>(OrderPolicyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
