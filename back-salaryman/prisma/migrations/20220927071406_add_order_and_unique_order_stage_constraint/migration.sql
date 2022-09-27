/*
  Warnings:

  - A unique constraint covering the columns `[stage,order]` on the table `Card` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "order" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Card_stage_order_key" ON "Card"("stage", "order");
