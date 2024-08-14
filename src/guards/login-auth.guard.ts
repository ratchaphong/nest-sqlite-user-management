import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LoginAuthGuard extends AuthGuard('login') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { email, password } = request.body;

    // ตรวจสอบว่า email และ password ถูกส่งมาหรือไม่
    if (!email || !password) {
      throw new BadRequestException('Email and password must be provided.');
    }

    // ถ้าข้อมูลถูกต้อง ให้เรียก method canActivate ของ AuthGuard เพื่อตรวจสอบต่อ
    return (await super.canActivate(context)) as boolean;
  }
}
