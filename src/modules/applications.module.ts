import { Module } from '@nestjs/common';
import { MediaModule } from "./media/media.module";
import { AuthenticationModule } from "./authentication/authentication.module";

@Module({
  imports: [AuthenticationModule, MediaModule],
  providers: [],
  exports: [],
})
export class ApplicationsModule {}
