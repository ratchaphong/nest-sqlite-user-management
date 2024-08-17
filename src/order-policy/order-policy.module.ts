import { Module } from '@nestjs/common';
import { OrderPolicyService } from './order-policy.service';
import { OrderPolicyController } from './order-policy.controller';
import { SharedModule } from 'src/shared-module/shared-module.module';
import { AuthModule } from 'src/auth/auth.module';
import { AdminStrategy } from 'src/strategies/admin.strategy';
import { JwtStrategy } from 'src/strategies/jwt.strategy';

@Module({
  imports: [SharedModule, AuthModule],
  controllers: [OrderPolicyController],
  providers: [OrderPolicyService, JwtStrategy, AdminStrategy],
})
export class OrderPolicyModule {}
