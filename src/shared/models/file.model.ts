import {
  AllowNull,
  AutoIncrement, BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  DefaultScope,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Scopes,
  Table
} from "sequelize-typescript";
import { UserModel } from "./user.model";

@Table({
  tableName: 'files',
})

export class FileModel extends Model<FileModel> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  filePath: string;


  @Column(DataType.STRING)
  filename: string;

  @Column(DataType.STRING)
  type: string;

  @ForeignKey(() => UserModel)
  @Column(DataType.INTEGER)
  userId: number;

  @BelongsTo(() => UserModel, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE',
  })
  user: UserModel;
}
