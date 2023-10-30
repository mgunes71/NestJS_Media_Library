import { Injectable } from '@nestjs/common';
import * as axios from "axios";
import { Axios } from "axios";

@Injectable()
export class AxiosService {
  private readonly http: any

  constructor() {
    this.http = axios;

    this.getHttp()
  }

  getHttp(): Axios {
    return this.http;
  }

}
