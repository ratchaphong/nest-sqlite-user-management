import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LoginStrategy } from '../strategies/login.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { AdminStrategy } from '../strategies/admin.strategy';
import { SharedModule } from '../shared-module/shared-module.module';

@Module({
  imports: [SharedModule],
  controllers: [AuthController],
  providers: [AuthService, LoginStrategy, JwtStrategy, AdminStrategy],
  exports: [AuthService], // Export AuthService เพื่อให้โมดูลอื่นสามารถใช้งานได้
})
export class AuthModule {}
