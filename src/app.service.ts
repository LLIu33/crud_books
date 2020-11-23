import { Injectable } from '@nestjs/common';
import CrudService from './crud.service';

@Injectable()
export class AppService {

  constructor(private readonly crudService: CrudService) {

  }

  async getHello(): Promise<string> {
    return `Total books are ${await this.crudService.bookRepo.count()}`;
  }
}
