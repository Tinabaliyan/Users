import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('users')
  async createUser(@Body() userData: { username: string; email: string; phoneNumber: string }) {
    return await User.create({
      username: userData.username,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
    });
  }

  @Get('users')
  async getAllUsers() {
    return await User.findAll();
  }
  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    return await User.destroy({ where: { id } });
  }
  @Put('users/:id')
  async updateUser(@Param('id') id: string, @Body() userData: { username: string; email: string; phoneNumber: string }) {
    return await User.update({
      username: userData.username,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
    }, { where: { id } });
  }
}
