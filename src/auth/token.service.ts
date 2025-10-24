import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenService {
  private readonly secretKey = 'SECRET_KEY'; // Use environment variable in production
  private readonly expiresIn = '1d';

  generateToken(payload: { sub: number }): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: this.expiresIn });
  }

  verifyToken(token: string): {
    sub: number;
    iat: number;
    exp: number;
  } {
    try {
      const decoded = jwt.verify(token, this.secretKey) as any;
      if (typeof decoded === 'string' || !decoded || !decoded.sub) {
        throw new Error('Invalid token payload');
      }
      return {
        sub: decoded.sub,
        iat: decoded.iat,
        exp: decoded.exp,
      };
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  extractTokenFromHeader(authHeader: string): string | null {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.substring(7);
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwt.decode(token) as any;
      if (!decoded || !decoded.exp) {
        return true;
      }
      return Date.now() >= decoded.exp * 1000;
    } catch (error) {
      return true;
    }
  }
}
