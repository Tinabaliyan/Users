import { Column, Model, PrimaryKey, Table, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../user/user.model';

@Table({ tableName: 'Blogs' })
export class Blog extends Model<Blog> {

  
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column
  blogData: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
