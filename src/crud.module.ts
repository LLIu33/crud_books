import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CrudService from './crud.service';
import Author from './db/models/author.entity';
import Book from './db/models/book.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Author,
      Book,
    ]),
  ],
  providers: [CrudService],
  exports: [CrudService],
})
class CrudModule {

}
export default CrudModule;
