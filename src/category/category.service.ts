import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { categories, Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.categoriesCreateInput): Promise<categories> {
    return this.prisma.categories.create({ data });
  }

  async findAll(): Promise<categories[]> {
    return this.prisma.categories.findMany();
  }

  async findOne(id: string): Promise<categories | null> {
    return this.prisma.categories.findUnique({ where: { id } });
  }

  async update(
    id: string,
    data: Prisma.categoriesUpdateInput,
  ): Promise<categories> {
    return this.prisma.categories.update({ where: { id }, data });
  }

  async remove(id: string): Promise<categories> {
    return this.prisma.categories.delete({ where: { id } });
  }
}
