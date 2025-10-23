import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { Blog } from '../blog/blog.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RedisService } from '../redis/redis.service';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private redisService: RedisService,
  ) {}


  async createUser(userData: CreateUserDto) {
    return await this.userModel.create(userData as any);
  }
  
  
  async getAllUsers() {
    // Try to get from cache first
    const cachedUsers = await this.redisService.get('users:all');
    if (cachedUsers) {
      return cachedUsers;
    }

    // If not in cache, fetch from database
    const users = await this.userModel.findAll({ include: [Blog] });
    
    // Cache the result for 5 minutes
    await this.redisService.set('users:all', users, 300);
    
    return users;
  }

  async deleteUser(id: string) {
    return await this.userModel.destroy({ where: { id } });
  }

  async updateUser(id: string, userData: Partial<CreateUserDto>) {
    await this.userModel.update(userData, { where: { id } });
    return await this.userModel.findByPk(id, { include: [Blog] });
  }

  async findByEmail(email: string): Promise<User | null> {
    // Try to get from cache first
    const cachedUser = await this.redisService.get<User>(`user:email:${email}`);
    if (cachedUser) {
      return cachedUser;
    }
  

    // If not in cache, fetch from database
    const user = await this.userModel.findOne({ where: { email } });
    
    // Cache the result for 10 minutes
    if (user) {
      await this.redisService.set(`user:email:${email}`, user, 600);
    }
    
    return user;
  }
}
