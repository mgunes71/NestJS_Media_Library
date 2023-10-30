import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from "../../../shared/models/user.model";
import { FileModel } from "../../../shared/models/file.model";


@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      models: [UserModel, FileModel],
      autoLoadModels: true,
      define: {
        defaultScope: {
          nest: true,
          raw: false,
        },
      },

      // sync: {
      //   alter: true,
      // },
    }),
  ],
  exports: [SequelizeModule],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
