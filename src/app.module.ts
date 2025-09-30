import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import{ AppService } from './app.service';
import { SequelizeModule}  from '@nestjs/sequelize'
import { User } from './user.model';


@Module({
  imports: [SequelizeModule.forRoot({
    dialect: 'postgres',
    host:'localhost',
    port: 5432,
    username:'postgres',
    password:'123',
    database:'postgres',
    models: [User],
    autoLoadModels:true,
    synchronize:true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
