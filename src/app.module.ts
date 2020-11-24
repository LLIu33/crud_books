import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import CrudModule from './crud.module';
import { GraphQLModule } from '@nestjs/graphql';
import AuthorResolver from './resolvers/author.resolver';
import BookResolver from './resolvers/book.resolver';

const graphQLImports = [
  AuthorResolver,
  BookResolver,
];

@Module({

  imports: [TypeOrmModule.forRoot({
    keepConnectionAlive: true,
  }),
    CrudModule,
    ...graphQLImports,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
