/*
  Warnings:

  - A unique constraint covering the columns `[userId,stage,order]` on the table `Card` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Card_stage_order_key";

-- CreateIndex
CREATE UNIQUE INDEX "Card_userId_stage_order_key" ON "Card"("userId", "stage", "order");
