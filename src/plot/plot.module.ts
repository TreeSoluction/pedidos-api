import { Module } from '@nestjs/common';
import { PlotController } from './plot.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PlotController],
  providers: [PrismaService]
})
export class PlotModule { }
