import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';

import { ClientModule } from './client.module';

describe('ClientController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ClientModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({ errorHttpStatusCode: 422 }));

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

  it('Should not be able create a client without username', async () => {
    const response = await request(app.getHttpServer()).post('/client').send({
      username: '',
      password: 'teste2e',
    });

    expect(response.status).toBe(422);
    expect(JSON.parse(response.text)).toHaveProperty('message', [
      'username should not be empty',
    ]);
  });

  it('Should not be able create a client without password', async () => {
    const response = await request(app.getHttpServer()).post('/client').send({
      username: 'teste2e',
      password: '',
    });

    expect(response.status).toBe(422);
    expect(JSON.parse(response.text)).toHaveProperty('message', [
      'password should not be empty',
    ]);
  });

  it('Should not be able create a client with number username', async () => {
    const response = await request(app.getHttpServer()).post('/client').send({
      username: 1,
      password: 'teste2e',
    });

    expect(response.status).toBe(422);
    expect(JSON.parse(response.text)).toHaveProperty('message', [
      'username must be a string',
    ]);
  });

  it('Should not be able create a client with number password', async () => {
    const response = await request(app.getHttpServer()).post('/client').send({
      username: 'teste2e',
      password: 1,
    });

    expect(response.status).toBe(422);
    expect(JSON.parse(response.text)).toHaveProperty('message', [
      'password must be a string',
    ]);
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
    expect(JSON.parse(response.text)).toHaveProperty('refreshToken');
  });
});
