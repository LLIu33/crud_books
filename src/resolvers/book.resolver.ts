import { Args, Mutation, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import CrudService from '../crud.service';
import Author from '../db/models/author.entity';
import Book from '../db/models/book.entity';
import BookInput from './input/book.input';

@Resolver(Book)
class BookResolver {

  constructor(private readonly crudService: CrudService) {}
  @Query(() => [Book])
  public async books(): Promise<Book[]> {
    return this.crudService.bookRepo.find();
  }
  @Query(() => Book, {nullable: true})
  public async book(@Args('id') id: number): Promise<Book> {
    return this.crudService.bookRepo.findOne({where: {id}});
  }

  @Mutation(() => Book)
  public async createBook(@Args('data') input: BookInput): Promise<Book> {
    const book = new Book();
    book.name = input.name;
    book.authorId = input.authorId;
    return this.crudService.bookRepo.save(book);
  }

  @ResolveProperty()
  public async author(@Parent() parent): Promise<Author> {
    return this.crudService.authorRepo.findOne(parent.authorId);
  }
}

export default BookResolver;
