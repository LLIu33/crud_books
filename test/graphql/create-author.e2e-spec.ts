import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Create Author (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Create Author with valid input', async () => {
    const query: string = `
      mutation {
        createAuthor(data:{
          name: "Pushkin"
        }) {
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
    return expect(response['body']['data']['createAuthor']['name']).toMatch('Pushkin');
  });
});
