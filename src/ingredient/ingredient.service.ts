import { Injectable } from '@nestjs/common';
import { ingredients, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IngredientService {
  constructor(private prisma: PrismaService) {}

  async create(createIngredientDto: Prisma.ingredientsCreateInput) {
    return await this.prisma.ingredients.create({ data: createIngredientDto });
  }

  async findAll(): Promise<ingredients[]> {
    return this.prisma.ingredients.findMany();
  }

  async findOne(id: string): Promise<ingredients | null> {
    return this.prisma.ingredients.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.ingredientsUpdateInput,
  ): Promise<ingredients> {
    return this.prisma.ingredients.update({ where: { id }, data });
  }

  async remove(id: string): Promise<ingredients> {
    return this.prisma.ingredients.delete({ where: { id } });
  }
}
