/*
  Warnings:

  - A unique constraint covering the columns `[userId,day]` on the table `CrushEditorState` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CrushEditorState_userId_day_key" ON "CrushEditorState"("userId", "day");
