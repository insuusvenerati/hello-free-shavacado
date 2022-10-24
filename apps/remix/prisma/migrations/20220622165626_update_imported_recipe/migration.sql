/*
  Warnings:

  - You are about to drop the column `categories` on the `ImportedRecipe` table. All the data in the column will be lost.
  - You are about to drop the column `ingredients` on the `ImportedRecipe` table. All the data in the column will be lost.
  - You are about to drop the column `instructions` on the `ImportedRecipe` table. All the data in the column will be lost.
  - You are about to drop the column `yield` on the `ImportedRecipe` table. All the data in the column will be lost.
  - Added the required column `recipeYield` to the `ImportedRecipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImportedRecipe" DROP COLUMN "categories",
DROP COLUMN "ingredients",
DROP COLUMN "instructions",
DROP COLUMN "yield",
ADD COLUMN     "keywords" TEXT[],
ADD COLUMN     "recipeCategories" TEXT[],
ADD COLUMN     "recipeCuisines" TEXT[],
ADD COLUMN     "recipeIngredients" TEXT[],
ADD COLUMN     "recipeInstructions" TEXT[],
ADD COLUMN     "recipeTypes" TEXT[],
ADD COLUMN     "recipeYield" TEXT NOT NULL;
