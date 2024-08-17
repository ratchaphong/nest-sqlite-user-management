import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // Replace 'YOUR_SECRET_KEY' with your secret key
    });
  }

  async validate(payload: {
    sub: string; // Typically used to store the user ID
    username: string;
  }) {
    console.log(payload);

    return await this.authService.findById(payload.sub);
  }
}
