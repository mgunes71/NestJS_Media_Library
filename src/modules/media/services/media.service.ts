import { BadRequestException, Injectable } from "@nestjs/common";
import { MediaMicServiceService } from "../../microservices/services/media-mic-service.service";
import { FileModel } from "../../../shared/models/file.model";

import * as path from "path";


@Injectable()
export class MediaService {
  constructor(private mediaMicroService: MediaMicServiceService) {
  }


  async getFilename(user: any, filename: string): Promise<any> {
    return this.mediaMicroService.getFileByName(user, filename);
  }

  async saveMultipleFiles(user: any, files: any) {
    const [err, data] = await this.mediaMicroService.uploadMultipleFiles(user, files).toArray();
    if (err) {
      throw new BadRequestException(`file Not saved, Error: ${err}`);
    }

    await (async () => {
      for (const file of files) {
        try {
          const type = file.originalname.split('-')[0];

          const fileForDb = await FileModel.create({
            userId: user.id,
            filename: file.originalname,
            type: type,
            filePath: `${process.env.MICROSERVICE_URL}/${user.email}/${file.originalname}`
          });
        } catch (e) {
          console.log(e)
        }
      }
    })();

    return {
      status: "success",
      message: "file is saved"
    };
  }


  async deleteMultipleFile(user: any, files: any) {
    const [err, data] = await this.mediaMicroService.deleteMultipleFile(user, files).toArray();

    if (err) {
      throw new BadRequestException(`file Not deleted, Error: ${err}`);
    }

    await (async () => {
      for (const file of files) {
        try {
          const fileForDb = await FileModel.destroy({
            where: {
              userId: user.id,
              filename: file,
            }
          });
        } catch (e) {
          console.log(e)
        }
      }
    })();

    return {
      status: "success",
      message: "File is deleted"
    };
  }

  async deleteFile(user: any, filename: string) {
    const [err, data] = await this.mediaMicroService.deleteFile(user, filename).toArray();

    if (err) {
      throw new BadRequestException(`file Not deleted, Error: ${err}`);
    }

    const deletedFile = await FileModel.destroy({
      where: {
        userId: user.id,
        filename: filename
      }
    });

    return {
      status: "success",
      message: "File is deleted"
    };
  }

  async getAllFiles(user: any) {
    const files = await FileModel.findAll(
      {
        where: {
          userId: user.id
        }
      }
    );
    return files;
  }
}
