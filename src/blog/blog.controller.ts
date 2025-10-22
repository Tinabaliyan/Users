import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from './blog.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  // Create a new blog (protected)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: { blogData: string }, @Request() req): Promise<Blog> {
    const userId = req.user.userId; // Extracted from JWT
    return this.blogService.createBlog(body.blogData, userId);
  }

  //  Get all blogs (public)
  @Get()
  async findAll(): Promise<Blog[]> {
    return this.blogService.getAllBlogs();
  }

  // Get blog by ID (public)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Blog> {
    return this.blogService.getBlogById(id);
  }

  // Update blog (protected)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: { blogData: string },
    @Request() req,
  ): Promise<Blog> {
    const userId = req.user.userId;
    return this.blogService.updateBlog(userId, body.blogData);
  }

  //  Delete blog (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number, @Request() req): Promise<void> {
    const userId = req.user.userId;
    return this.blogService.deleteBlog(userId);
  }

  // Get blogs for current user (protected)
  @UseGuards(JwtAuthGuard)
  @Get('me/blogs')
  async findMyBlogs(@Request() req): Promise<Blog[]> {
    const userId = req.user.userId;
    return this.blogService.getBlogsByUserId(userId);
  }

  // (Optional) Get blogs by userId (public)
  @Get('users/:userId/blogs')
  async findBlogsByUser(@Param('userId') userId: number): Promise<Blog[]> {
    return this.blogService.getBlogsByUserId(userId);
  }
}
