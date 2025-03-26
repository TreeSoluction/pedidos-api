import { Injectable } from '@nestjs/common';
import { order, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { connect } from 'http2';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.orderCreateInput): Promise<order> {
    if (!Array.isArray(data.items)) {
      throw new Error('Items must be an array');
    }

    return await this.prisma.order.create({
      data: {
        ...data,
        items: {
          create: await Promise.all(
            data.items.map(async (item) => {
              const product = await this.prisma.product.findUnique({
                where: { id: item.product_id },
                select: { buy_price: true, sold_price: true, id: true },
              });

              if (!product) {
                throw new Error('Product not found');
              }

              return {
                sold_price: product.sold_price,
                buy_price: product.buy_price,
                product: { connect: { id: product.id } }
              };
            })
          ),
        },
      },
    });
  }


  async findAll(): Promise<order[]> {
    return this.prisma.order.findMany({ include: { items: true } });
  }

  async findOne(id: string): Promise<order | null> {
    return this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
  }

  async update(id: string, data: Prisma.orderUpdateInput): Promise<order> {
    return this.prisma.order.update({ where: { id }, data });
  }

  async remove(id: string): Promise<order> {
    return this.prisma.order.delete({ where: { id } });
  }
}
