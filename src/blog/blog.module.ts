import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Blog } from './blog.model';

@Module({
  imports: [SequelizeModule.forFeature([Blog])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
