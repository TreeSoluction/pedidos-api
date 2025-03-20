/*
  Warnings:

  - You are about to drop the column `addable` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `removable` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "addable",
DROP COLUMN "removable";
