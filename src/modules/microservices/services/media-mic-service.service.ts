import { BadRequestException, Injectable } from "@nestjs/common";
import { AxiosService } from "../../../core/axios/axios.service";
import * as  FormData from "form-data";

@Injectable()
export class MediaMicServiceService {
  private microServiceUrl = "http://localhost:5000";

  constructor(private httpService: AxiosService) {
  }

  async uploadFile(user: any, file: any) {
    try {
      const formData = new FormData();
      await formData.append("file", file.buffer, file.originalname);

      const [err, response] = await this.httpService.getHttp().post(`${this.microServiceUrl}/media`, formData,
        {
          headers: {
            user: user.email
          }
        }).toArray();

      return response.data;

    } catch (e) {
      throw new BadRequestException(`file not upload ${e}`);
    }
  }

  async uploadMultipleFiles(user: any, files: any) {
    const formData = new FormData();
    try {
      for (const file of files) {
        await formData.append("files", file.buffer, file.originalname);
      }

      const [err, response] = await this.httpService.getHttp().post(`${this.microServiceUrl}/media/files`, formData,
        {
          headers: {
            user: user.email
          }
        }).toArray();

      return response.data;

    } catch (e) {
      throw new BadRequestException(`file not upload ${e}`);
    }
  }

  async getFileByName(user: any, filename: string) {
    try {
      const response = await this.httpService.getHttp().get(`${this.microServiceUrl}/media/${filename}`, {
        headers: {
          user: user.email,
        }
      });
      return response.data;
    } catch (e) {
      throw new BadRequestException(`request is not successfully ${e.response.data.message}`);
    }
  }

  async deleteMultipleFile(user:any, files: any) {
    try {
      const response = await this.httpService.getHttp().delete(`${this.microServiceUrl}/media`, {
        data: files,
        headers: {
          user: user.email
        }
      });
      return response.data;
    } catch (e) {
      throw new BadRequestException(`request is not successfully ${e.response.data.message}`);
    }
  }

  async deleteFile(user:any, filename: string) {
    try {
      const response = await this.httpService.getHttp().delete(`${this.microServiceUrl}/media/${filename}`, {
        headers: {
          user: user.email
        }
      });
      return response.data;
    } catch (e) {
      throw new BadRequestException(`request is not successfully ${e.response.data.message}`);
    }
  }
}
