import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(data: { username: string; email: string; phoneNumber: string; password: string }) {
    const userExists = await this.userService.findByEmail(data.email);
    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.userService.createUser({
      username: data.username,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: hashedPassword,
    });

    const { password, ...result } = user.toJSON();
    return result;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) throw new UnauthorizedException('Invalid credentials');

    const { password: _, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
