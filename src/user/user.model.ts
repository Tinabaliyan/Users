import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import { Blog } from '../blog/blog.model';

@Table({ tableName: 'Users' })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column
  declare username: string;

  @Column
  declare email: string;

  @Column({
    field: 'phone_number',
  })
  declare phoneNumber: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @HasMany(() => Blog)
  blogs: Blog[];
}
