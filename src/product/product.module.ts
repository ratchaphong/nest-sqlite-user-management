import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { AuthModule } from 'src/auth/auth.module';
import { SharedModule } from 'src/shared-module/shared-module.module';
import { AdminStrategy } from 'src/strategies/admin.strategy';
import { JwtStrategy } from 'src/strategies/jwt.strategy';

@Module({
  imports: [SharedModule, AuthModule],
  controllers: [ProductController],
  providers: [ProductService, JwtStrategy, AdminStrategy],
})
export class ProductModule {}
