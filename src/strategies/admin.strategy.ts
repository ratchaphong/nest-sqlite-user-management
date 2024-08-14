import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // Replace 'YOUR_SECRET_KEY' with your secret key
    });
  }

  async validate(payload: {
    sub: number; // Typically used to store the user ID
    username: string;
  }) {
    console.log(payload);

    const user = await this.authService.findById(payload.sub);
    if (!user.isAdmin) {
      throw new ForbiddenException('You do not have access to this resource');
    }

    return user;
  }
}
