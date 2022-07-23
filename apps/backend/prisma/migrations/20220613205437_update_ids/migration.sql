/*
  Warnings:

  - You are about to drop the column `recipe` on the `recipes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `recipes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `recipes` will be added. If there are existing duplicate values, this will fail.
  - Made the column `uuid` on table `groceries` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `slug` to the `recipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uuid` to the `recipes` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "recipes_recipe_key";

-- AlterTable
ALTER TABLE "groceries" ALTER COLUMN "uuid" SET NOT NULL;

-- AlterTable
ALTER TABLE "recipes" DROP COLUMN "recipe",
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "uuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "recipes_slug_key" ON "recipes"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "recipes_uuid_key" ON "recipes"("uuid");
