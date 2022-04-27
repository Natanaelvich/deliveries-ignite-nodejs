import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';

import { DeliveryModule } from './delivery.module';

import { AuthenticateclientModule } from 'src/client/authenticateclient/authenticateclient.module';
import { ClientModule } from 'src/client/client.module';

describe('ClientController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DeliveryModule, AuthenticateclientModule, ClientModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({ errorHttpStatusCode: 422 }));

    await app.init();
  });

  it('Should be able create a delivery', async () => {
    await request(app.getHttpServer()).post('/client').send({
      username: 'teste2e',
      password: 'teste2e',
    });

    const responseAuthClient = await request(app.getHttpServer())
      .post('/authenticateclient')
      .send({
        username: 'teste2e',
        password: 'teste2e',
      });

    const { token } = JSON.parse(responseAuthClient.text);

    const responseDelivery = await request(app.getHttpServer())
      .post('/delivery')
      .send({
        item_name: 'deliveryteste2e',
      })
      .set('Authorization', `Bearer ${token}`);

    console.log(responseDelivery.text);

    expect(responseDelivery.status).toBe(201);
    expect(JSON.parse(responseDelivery.text)).toHaveProperty(
      'item_name',
      'deliveryteste2e',
    );
  });
});
