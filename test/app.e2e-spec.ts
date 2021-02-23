import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', async () => {
    const { status, body } = await request(app.getHttpServer()).get('/');
    expect(status).toEqual(200);
  });
  it('/search (GET)', async () => {
    const { status, body } = await request(app.getHttpServer()).get('/search');
    expect(status).toEqual(200);
    expect(body).toHaveProperty('result');
    expect(body.result).toBe('Thanks for submitting!');
  });
});
