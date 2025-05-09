import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { Prisma } from '@prisma/client';

@Controller('ingredients')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) { }

  @Post()
  async create(@Body() createIngredientDto: Prisma.ingredientsCreateInput) {
    if (await this.ingredientService.alreadyExist(createIngredientDto)) {
      throw new BadRequestException("Ja existe");
    }
    return this.ingredientService.create(createIngredientDto);
  }


  @Get()
  findAll() {
    return this.ingredientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingredientService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIngredientDto: Prisma.ingredientsUpdateInput,
  ) {
    return this.ingredientService.update(id, updateIngredientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingredientService.remove(id);
  }
}
