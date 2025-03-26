import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.productCreateInput): Promise<product> {
    return this.prisma.product.create({ data });
  }

  async findAll(): Promise<product[]> {
    return this.prisma.product.findMany();
  }

  async findOne(id: string): Promise<product | null> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async update(id: string, data: Prisma.productUpdateInput): Promise<product> {
    return this.prisma.product.update({ where: { id }, data });
  }

  async remove(id: string): Promise<product> {
    return this.prisma.product.delete({ where: { id } });
  }
}
