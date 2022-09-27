/*
  Warnings:

  - You are about to drop the column `Difficulty` on the `created_recipe` table. All the data in the column will be lost.
  - You are about to drop the column `Steps` on the `created_recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "created_recipe" DROP COLUMN "Difficulty",
DROP COLUMN "Steps",
ADD COLUMN     "difficulty" TEXT,
ADD COLUMN     "steps" TEXT[];
