/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Field` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Thing` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Field" DROP CONSTRAINT "Field_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Thing" DROP CONSTRAINT "Thing_categoryId_fkey";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Field";

-- DropTable
DROP TABLE "Thing";
