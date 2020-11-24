import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Create Book (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Create Book with valid input', async () => {
    const query: string = `
      mutation {
        createBook(data:{
          name: "Sillmirlion"
          authorId: 1
        }) {
          id
          name
          author{
            id
            name
          }
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({query})
      .set('Accept', 'application/json')
      .expect(200);
      console.log(response.error);
      expect(response['body']['data']['createBook']['name']).toMatch('Sillmirlion');
      return expect(response['body']['data']['createBook']['author']['id']).toStrictEqual(1);
  });
});
