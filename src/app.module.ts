import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { OrderPolicyModule } from './order-policy/order-policy.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [AuthModule, UserModule, OrderPolicyModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
