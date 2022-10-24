/*
  Warnings:

  - Made the column `created_at` on table `hellofresh` required. This step will fail if there are existing NULL values in that column.
  - Made the column `recipe` on table `hellofresh` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `hellofresh` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `hellofresh` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `hellofresh` required. This step will fail if there are existing NULL values in that column.
  - Made the column `textSearch` on table `hellofresh` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "hellofresh" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "recipe" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "textSearch" SET NOT NULL;
