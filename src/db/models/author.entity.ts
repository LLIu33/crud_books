import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Book from './book.entity';

@ObjectType()
@Entity({name: 'authors'})
export default class Author {

  @Field({name: 'id'})
  @PrimaryGeneratedColumn()
  authorId: number;

  @Field()
  @Column()
  name: string;

  // Associations
  @OneToMany(() => Book, book => book.authorConnection)
  bookConnection: Promise<Book[]>;

}
