// src/auth/auth.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { TokenService } from './token.service';
import { CustomAuthGuard } from './custom-auth.guard';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [AuthService, TokenService, CustomAuthGuard],
  controllers: [AuthController],
  exports: [TokenService, CustomAuthGuard],
})
export class AuthModule {}
