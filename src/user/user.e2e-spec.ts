import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';

import { UserModule } from './user.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({ errorHttpStatusCode: 422 }));

    await app.init();
  });

  it('Should be able create a user', async () => {
    const response = await request(app.getHttpServer()).post('/user').send({
      username: 'teste2e',
      password: 'teste2e',
    });

    expect(response.status).toBe(201);
    expect(JSON.parse(response.text)).toHaveProperty('username', 'teste2e');
  });

  it('Should not be able create a user without username', async () => {
    const response = await request(app.getHttpServer()).post('/user').send({
      username: '',
      password: 'teste2e',
    });

    expect(response.status).toBe(422);
    expect(JSON.parse(response.text)).toHaveProperty('message', [
      'username should not be empty',
    ]);
  });

  it('Should not be able create a user without password', async () => {
    const response = await request(app.getHttpServer()).post('/user').send({
      username: 'teste2e',
      password: '',
    });

    expect(response.status).toBe(422);
    expect(JSON.parse(response.text)).toHaveProperty('message', [
      'password should not be empty',
    ]);
  });

  it('Should not be able create a user with number username', async () => {
    const response = await request(app.getHttpServer()).post('/user').send({
      username: 1,
      password: 'teste2e',
    });

    expect(response.status).toBe(422);
    expect(JSON.parse(response.text)).toHaveProperty('message', [
      'username must be a string',
    ]);
  });

  it('Should not be able create a user with number password', async () => {
    const response = await request(app.getHttpServer()).post('/user').send({
      username: 'teste2e',
      password: 1,
    });

    expect(response.status).toBe(422);
    expect(JSON.parse(response.text)).toHaveProperty('message', [
      'password must be a string',
    ]);
  });

  it('Should be able signin a user', async () => {
    await request(app.getHttpServer()).post('/user').send({
      username: 'teste2e',
      password: 'teste2e',
    });

    const response = await request(app.getHttpServer())
      .post('/authenticateuser')
      .send({
        username: 'teste2e',
        password: 'teste2e',
      });

    expect(response.status).toBe(201);
    expect(JSON.parse(response.text)).toHaveProperty('token');
    expect(JSON.parse(response.text)).toHaveProperty('refreshToken');
  });

  it('Should be able refresh token user', async () => {
    await request(app.getHttpServer()).post('/user').send({
      username: 'teste2e',
      password: 'teste2e',
    });

    const responseToken = await request(app.getHttpServer())
      .post('/authenticateuser')
      .send({
        username: 'teste2e',
        password: 'teste2e',
      });

    const { refreshToken } = JSON.parse(responseToken.text);

    const responseRefreshToken = await request(app.getHttpServer())
      .post('/refreshtokenuser')
      .send({
        refresh_token: refreshToken,
      });

    expect(responseRefreshToken.status).toBe(201);
    expect(JSON.parse(responseRefreshToken.text)).toHaveProperty('token');
    expect(JSON.parse(responseRefreshToken.text)).toHaveProperty(
      'refreshToken',
    );
  });
});
