import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ClientModule } from './client.module';

describe('ClientController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ClientModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should be able create a client', async () => {
    const response = await request(app.getHttpServer()).post('/client').send({
      username: 'teste2e',
      password: 'teste2e',
    });

    expect(response.status).toBe(201);
    expect(JSON.parse(response.text)).toHaveProperty('username', 'teste2e');
  });

  it('Should be able signin a client', async () => {
    await request(app.getHttpServer()).post('/client').send({
      username: 'teste2e',
      password: 'teste2e',
    });

    const response = await request(app.getHttpServer())
      .post('/authenticateclient')
      .send({
        username: 'teste2e',
        password: 'teste2e',
      });

    expect(response.status).toBe(201);
    expect(JSON.parse(response.text)).toHaveProperty('token');
  });
});
