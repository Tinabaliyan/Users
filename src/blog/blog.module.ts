import { Module, forwardRef } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Blog } from './blog.model';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Blog]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
