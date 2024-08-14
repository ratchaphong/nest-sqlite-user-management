import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // First, check if there is a session with a user
    if (request.session && request.session.user) {
      console.log('Session user found:', request.session.user);
      return true;
    }

    // If no session user, check for JWT in the Authorization header
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7); // Skip "Bearer "
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('JWT decoded:', decoded);

        // Optionally attach user to request here
        request.user = decoded;
        return true;
      } catch (error) {
        console.log('Invalid or expired JWT:', error.message);
        return false;
      }
    }

    console.log('No session or valid JWT found.');
    return false;
  }
}
