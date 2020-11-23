import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import CrudService from '../crud.service';
import Author from '../db/models/author.entity';
import AuthorInput from './input/author.input';

@Resolver()
class AuthorResolver {
  constructor(private readonly crudService: CrudService) {}

  @Query(() => [Author])
  public async authors(): Promise<Author[]> {
    return this.crudService.authorRepo.find();
  }
  @Query(() => Author, {nullable: true})
  public async author(@Args('id') id: number): Promise<Author> {
    return  this.crudService.authorRepo.findOne({where: {id}});
  }

  @Mutation(() => Author)
  public async createAuthor(@Args('data') input: AuthorInput): Promise<Author> {
    const author = this.crudService.authorRepo.create({name: input.name});
    return  this.crudService.authorRepo.save(author);
  }
}
export default AuthorResolver;
