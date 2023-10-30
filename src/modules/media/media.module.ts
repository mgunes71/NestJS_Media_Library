import { Module } from "@nestjs/common";
import { MediaController } from "./controllers/media.controller";
import { MediaService } from "./services/media.service";
import { MediaMicServiceService } from "../microservices/services/media-mic-service.service";
import { AxiosService } from "../../core/axios/axios.service";

@Module({
  imports: [],
  controllers: [MediaController],
  providers: [MediaService, MediaMicServiceService, AxiosService],
  exports: [],
})
export class MediaModule {
}
