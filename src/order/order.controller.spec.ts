import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

describe('OrderController', () => {
  let controller: OrderController;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService, PrismaService],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prisma.order_item.deleteMany();
    await prisma.order.deleteMany();
    await prisma.$disconnect();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prisma).toBeDefined();
  });

  it('should create an order', async () => {
    const category = await prisma.category.create({ data: { name: "Teste", } })
    const product = await prisma.product.create({ data: { name: "Teste", category_id: category.id, sold_price: 10, buy_price: 10 } })
    const dto: Prisma.orderCreateInput = {
      name: 'Test Order',
      address: '123 Test St',
      items: {
        create: [
          {
            buy_price: product.buy_price,
            sold_price: product.sold_price,
            product_id: product.id
          }
        ],
      },
    };

    const order = await prisma.order.create({ data: dto });
    expect(order).toHaveProperty('id');
    expect(order.name).toBe(dto.name);
  });

  it('should find all orders', async () => {
    const orders = await prisma.order.findMany();
    expect(orders.length).toBeGreaterThan(0);
  });

  it('should find one order', async () => {
    const order = await prisma.order.findFirstOrThrow();
    const foundOrder = await controller.findOne(order.id);
    if (foundOrder == null) fail();
    expect(foundOrder.id).toBe(order.id);
  });

  it('should update an order', async () => {
    const order = await prisma.order.findFirstOrThrow();
    const dto: Prisma.orderUpdateInput = { name: 'Updated Order' };
    const updatedOrder = await prisma.order.update({ where: { id: order.id }, data: dto });
    expect(updatedOrder.name).toBe(dto.name);
  });

  it('should delete an order', async () => {
    await prisma.order.create({
      data: {

      }
    })
    const order = await prisma.order.findFirstOrThrow({ orderBy: { createdAt: "desc" } });
    await prisma.order.delete({ where: { id: order.id } });
    const deletedOrder = await prisma.order.findUnique({ where: { id: order.id } });
    expect(deletedOrder).toBeNull();
  });
});