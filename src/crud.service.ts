import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Author from './db/models/author.entity';
import Book from './db/models/book.entity';

@Injectable()
class CrudService {
  public constructor(
    @InjectRepository(Author) public readonly authorRepo: Repository<Author>,
    @InjectRepository(Book) public readonly bookRepo: Repository<Book>,
  ) {}
}

export default CrudService;
