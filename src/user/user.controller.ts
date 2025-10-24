import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Request,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CustomAuthGuard } from '../auth/custom-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(CustomAuthGuard)
  getProfile(@Request() req) {
    return req.user; // this is populated by our custom auth guard
  }

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: string,
    @Body() userData: Partial<CreateUserDto>,
  ) {
    return this.userService.updateUser(id, userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
