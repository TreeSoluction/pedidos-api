import { Injectable } from '@nestjs/common';
import { orders, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.ordersCreateInput): Promise<orders> {
    if (!Array.isArray(data.items)) {
      throw new Error('Items must be an array');
    }

    return await this.prisma.orders.create({
      data: {
        ...data,
        items: {
          create: await Promise.all(
            data.items.map(async (item) => {
              const product = await this.prisma.products.findUnique({
                where: { id: item.create.product.connect.id },
                include: { product_ingredients: true }
              });

              if (!product) {
                throw new Error('Product not found');
              }

              return {
                observation: item.create.observation,
                sold_price: product.sold_price,
                buy_price: product.buy_price,
                product: { connect: { id: product.id } },
              };
            }),
          ),
        },
      },
      include: { items: true },
    });
  }

  async findAll(): Promise<orders[]> {
    return this.prisma.orders.findMany({ include: { items: true } });
  }

  async findOne(id: string): Promise<orders | null> {
    return this.prisma.orders.findUnique({
      where: { id },
      include: { items: true },
    });
  }

  async update(id: string, data: Prisma.ordersUpdateInput): Promise<orders> {
    return this.prisma.orders.update({ where: { id }, data });
  }

  async remove(id: string): Promise<orders> {
    return this.prisma.orders.delete({ where: { id } });
  }
}
