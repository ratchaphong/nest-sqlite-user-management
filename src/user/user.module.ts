import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared-module/shared-module.module';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { AdminStrategy } from '../strategies/admin.strategy';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [SharedModule, AuthModule],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, AdminStrategy],
})
export class UserModule {}
