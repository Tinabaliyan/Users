import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from './token.service';
import { UserService } from '../user/user.service';

@Injectable()
export class CustomAuthGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = this.tokenService.extractTokenFromHeader(authHeader);
    if (!token) {
      throw new UnauthorizedException('Invalid authorization header format');
    }

    try {
      // Verify token
      const payload = this.tokenService.verifyToken(token);

      // Check if token is expired
      if (this.tokenService.isTokenExpired(token)) {
        throw new UnauthorizedException('Token has expired');
      }

      // Verify user still exists by ID
      const user = await this.userService.findById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Attach user to request
      request.user = {
        id: payload.sub,
        user: user,
      };

      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid token');
    }
  }
}
