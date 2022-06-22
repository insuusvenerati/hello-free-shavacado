/*
  Warnings:

  - The `ingredients` column on the `ImportedRecipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `instructions` column on the `ImportedRecipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `categories` column on the `ImportedRecipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ImportedRecipe" DROP COLUMN "ingredients",
ADD COLUMN     "ingredients" TEXT[],
DROP COLUMN "instructions",
ADD COLUMN     "instructions" TEXT[],
DROP COLUMN "categories",
ADD COLUMN     "categories" TEXT[];
