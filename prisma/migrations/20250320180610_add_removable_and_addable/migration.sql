/*
  Warnings:

  - Made the column `name` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "product" ADD COLUMN     "addable" TEXT[],
ADD COLUMN     "removable" TEXT[],
ALTER COLUMN "name" SET NOT NULL;
