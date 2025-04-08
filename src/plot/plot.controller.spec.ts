import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaService } from '../prisma/prisma.service';
import { AppModule } from '../app.module';

describe('PlotController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);

    await app.init();

    await prisma.order_items.deleteMany();
    await prisma.orders.deleteMany();
    await prisma.products.deleteMany();
    const category = await prisma.categories.create({ data: { name: 'Teste' } });

    const productA = await prisma.products.create({
      data: { name: 'Produto A', category_id: category.id },
    });
    const productB = await prisma.products.create({
      data: { name: 'Produto B', category_id: category.id },
    });

    const order1 = await prisma.orders.create({
      data: { createdAt: new Date() },
    });
    const order2 = await prisma.orders.create({
      data: { createdAt: new Date() },
    });

    await prisma.order_items.createMany({
      data: [
        {
          order_id: order1.id,
          product_id: productA.id,
          createdAt: new Date(),
          sold_price: 10,
          buy_price: 10,
        },
        {
          order_id: order2.id,
          product_id: productA.id,
          createdAt: new Date(),
          sold_price: 10,
          buy_price: 10,
        },
        {
          order_id: order1.id,
          product_id: productB.id,
          createdAt: new Date(),
          sold_price: 10,
          buy_price: 10,
        },
      ],
    });
  });

  afterAll(async () => {
    // Limpa os dados após os testes
    await prisma.order_items.deleteMany();
    await prisma.orders.deleteMany();
    await prisma.products.deleteMany();

    await app.close();
  });

  it('/plot/weeksold/trending-products (GET) deve retornar os produtos mais vendidos', async () => {
    const response = await request(app.getHttpServer())
      .get('/plot/weeksold/trending-products')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('thisWeek');
    expect(response.body[0]).toHaveProperty('lastWeek');
  });

  it('/plot/daysold/product (GET) deve retornar os produtos vendidos no dia', async () => {
    const response = await request(app.getHttpServer())
      .get('/plot/daysold/product')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('count');
  });

  it('/plot/weeksold (GET) deve retornar a meta e quantos pedidos foram feitos na semana', async () => {
    const response = await request(app.getHttpServer())
      .get('/plot/weeksold')
      .expect(200);

    expect(response.body).toHaveProperty('goal');
    expect(response.body).toHaveProperty('reach');
    expect(response.body.reach).toBeGreaterThan(0);
  });

  it('/plot/diarysold (GET) deve retornar a meta e quantos pedidos foram feitos no dia', async () => {
    const response = await request(app.getHttpServer())
      .get('/plot/diarysold')
      .expect(200);

    expect(response.body).toHaveProperty('goal');
    expect(response.body).toHaveProperty('reach');
    expect(response.body.reach).toBeGreaterThan(0);
  });
});
