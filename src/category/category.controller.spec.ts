import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

describe('CategoryController', () => {
  let controller: CategoryController;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService, PrismaService],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prisma.products.deleteMany();
    await prisma.categories.deleteMany();
    await prisma.$disconnect();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prisma).toBeDefined();
  });

  it('should create a category', async () => {
    const dto: Prisma.categoriesCreateInput = { name: 'Test Category' };
    const category = await prisma.categories.create({ data: dto });
    expect(category).toHaveProperty('id');
    expect(category.name).toBe(dto.name);
  });

  it('should find all categories', async () => {
    await prisma.categories.create({ data: { name: 'Test Category 1' } });
    await prisma.categories.create({ data: { name: 'Test Category 2' } });
    const categories = await prisma.categories.findMany();
    expect(categories.length).toBeGreaterThan(0);
  });

  it('should find one category', async () => {
    const category = await prisma.categories.create({
      data: { name: 'Test Category' },
    });
    const foundCategory = await controller.findOne(category.id);
    if (foundCategory == null) fail();
    expect(foundCategory.id).toBe(category.id);
  });

  it('should update a category', async () => {
    const category = await prisma.categories.create({
      data: { name: 'Test Category' },
    });
    const dto: Prisma.categoriesUpdateInput = { name: 'Updated Category' };
    const updatedCategory = await prisma.categories.update({
      where: { id: category.id },
      data: dto,
    });
    expect(updatedCategory.name).toBe(dto.name);
  });

  it('should delete a category', async () => {
    const category = await prisma.categories.create({
      data: { name: 'Test Category' },
    });
    await prisma.categories.delete({ where: { id: category.id } });
    const deletedCategory = await prisma.categories.findUnique({
      where: { id: category.id },
    });
    expect(deletedCategory).toBeNull();
  });
});
