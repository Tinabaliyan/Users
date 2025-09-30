import { Table,Column,Model,DataType} from "sequelize-typescript";

@Table
export class User extends Model{
    @Column
    username:string;
    @Column
    email:string;
    @Column({
    field: 'phone_number', // maps to phone_number in DB
  })
    phoneNumber: string;
}
