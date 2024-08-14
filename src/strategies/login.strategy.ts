import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LoginStrategy extends PassportStrategy(Strategy, 'login') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email', // ระบุว่าฟิลด์ที่ใช้แทน username คือ email
      passwordField: 'password', // ฟิลด์ที่ใช้แทน password คือ password (ค่าเริ่มต้นคือ 'password' อยู่แล้ว แต่เพื่อความชัดเจนสามารถระบุไว้ได้)
    });
  }

  async validate(email: string, password: string) {
    return await this.authService.validateUser(email, password);
  }
}
