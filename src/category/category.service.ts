import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { category, Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.categoryCreateInput): Promise<category> {
    return this.prisma.category.create({ data });
  }

  async findAll(): Promise<category[]> {
    return this.prisma.category.findMany();
  }

  async findOne(id: string): Promise<category | null> {
    return this.prisma.category.findUnique({ where: { id } });
  }

  async update(
    id: string,
    data: Prisma.categoryUpdateInput,
  ): Promise<category> {
    return this.prisma.category.update({ where: { id }, data });
  }

  async remove(id: string): Promise<category> {
    return this.prisma.category.delete({ where: { id } });
  }
}
