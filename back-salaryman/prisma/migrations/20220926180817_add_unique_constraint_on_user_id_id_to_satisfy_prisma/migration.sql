/*
  Warnings:

  - A unique constraint covering the columns `[userId,id]` on the table `Card` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Card_userId_id_key" ON "Card"("userId", "id");
