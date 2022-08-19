/*
  Warnings:

  - Added the required column `name` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "name" TEXT NOT NULL;
