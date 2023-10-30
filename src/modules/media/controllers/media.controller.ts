import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { MediaService } from "../services/media.service";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { AuthenticatedUser } from "../../authentication/decorators/authenticated-user.decorator";
import { UserAuthGuard } from "../../authentication/guards/auth.guard";


@UseGuards(UserAuthGuard)
@Controller('media')
export class MediaController {
  constructor(private mediaService: MediaService) {
  }

  @Get(':filename')
  async getFilename(@AuthenticatedUser() user: any,  @Param('filename') filename: string) {
    return this.mediaService.getFilename(user, filename);
  }

  @Get()
  async getAllFiles(@AuthenticatedUser() user: any) {
    return this.mediaService.getAllFiles(user);
  }

  @Delete(':filename')
  async deleteFile(@AuthenticatedUser() user:any, @Param('filename') filename: string) {
    return this.mediaService.deleteFile(user, filename);
  }

  @Delete()
  async deleteMultipleFile(@AuthenticatedUser() user:any, @Body() files: any) {
    return this.mediaService.deleteMultipleFile(user, files);
  }


  @Post('upload-multiple-files')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadMultipleFiles(@AuthenticatedUser() user: any,  @UploadedFiles() files:Array<Express.Multer.File>): Promise<any> {
    return this.mediaService.saveMultipleFiles(user, files);
  }
}
