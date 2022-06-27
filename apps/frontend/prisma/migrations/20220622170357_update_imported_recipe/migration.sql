/*
  Warnings:

  - Added the required column `url` to the `ImportedRecipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImportedRecipe" ADD COLUMN     "cooktime_original_format" TEXT,
ADD COLUMN     "preptime_original_format" TEXT,
ADD COLUMN     "totaltime_original_format" TEXT,
ADD COLUMN     "url" TEXT NOT NULL;
