import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, products } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.productsCreateInput): Promise<products> {
    return this.prisma.products.create({ data });
  }

  async findAll(): Promise<products[]> {
    return this.prisma.products.findMany();
  }

  async findOne(id: string): Promise<products | null> {
    return this.prisma.products.findUnique({
      where: { id },
      include: {
        product_ingredients: true,
      },
    });
  }

  async update(
    id: string,
    data: Prisma.productsUpdateInput,
  ): Promise<products> {
    return this.prisma.products.update({ where: { id }, data });
  }

  async remove(id: string): Promise<products> {
    return this.prisma.products.delete({ where: { id } });
  }
}
