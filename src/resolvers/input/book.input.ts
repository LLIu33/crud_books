import { Field, InputType } from 'type-graphql';
@InputType()
class BookInput {
  @Field()
  readonly name: string;

  @Field()
  readonly authorId: number;
}

export default BookInput;
