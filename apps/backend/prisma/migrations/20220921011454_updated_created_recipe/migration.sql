/*
  Warnings:

  - You are about to drop the column `Tags` on the `created_recipe` table. All the data in the column will be lost.
  - Added the required column `image` to the `created_recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "created_recipe" DROP COLUMN "Tags",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[];
