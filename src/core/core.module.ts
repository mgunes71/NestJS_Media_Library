import { Module } from '@nestjs/common';
import { AxiosService } from "./axios/axios.service";
import { DatabaseModule } from "./modules/database/database.module";

@Module({
  imports: [DatabaseModule],
  providers: [AxiosService],
  exports: [AxiosService]
})
export class CoreModule {}
