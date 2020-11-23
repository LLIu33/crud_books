import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import Author from './author.entity';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity({name: 'books'})
export default class Book {

  @Field({name: 'id'})
  @PrimaryGeneratedColumn()
  bookId: number;

  @Field()
  @Column()
  name: string;

  @Field({name: 'page_count'})
  @Column({default: 0})
  pageCount: number;

  @Field()
  @Column({name: 'author_id'})
  authorId: number;

  @Field(() => Author)
  author: Author;
  // Associations

  @ManyToOne(() => Author, author => author.bookConnection, {primary:
      true})
  @JoinColumn({name: 'author_id'})
  authorConnection: Promise<Author>;
}
