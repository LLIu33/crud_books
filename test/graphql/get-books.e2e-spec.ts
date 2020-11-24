import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Get books (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Get books with authors', async () => {
    const query: string = `
      query {
        books{
          id
          name
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({query})
      .set('Accept', 'application/json')
      .expect(200);
      console.log(response.error);
      expect(response['body']['data']['books'][0]['name']).toMatch('Sillmirlion');
      return expect(response['body']['data']['books'][0]['author']).toBeUndefined();
  });

  it('Get books', async () => {
    const query: string = `
      query {
        books{
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
      expect(response['body']['data']['books'][0]['name']).toMatch('Sillmirlion');
      return expect(response['body']['data']['books'][0]['author']['id']).toBeDefined();
  });
});
