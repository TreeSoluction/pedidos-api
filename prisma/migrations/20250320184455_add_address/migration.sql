/*
  Warnings:

  - You are about to drop the column `email` on the `order` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "order_email_key";

-- AlterTable
ALTER TABLE "order" DROP COLUMN "email",
ADD COLUMN     "address" TEXT;
