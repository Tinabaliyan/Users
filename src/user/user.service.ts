import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { Blog } from '../blog/blog.model';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}


  async createUser(userData: CreateUserDto) {
    return await this.userModel.create(userData as any);
  }
  
  
  async getAllUsers() {
    return await this.userModel.findAll({ include: [Blog] });
  }

  async deleteUser(id: string) {
    return await this.userModel.destroy({ where: { id } });
  }

  async updateUser(id: string, userData: Partial<CreateUserDto>) {
    await this.userModel.update(userData, { where: { id } });
    return await this.userModel.findByPk(id, { include: [Blog] });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }
}
