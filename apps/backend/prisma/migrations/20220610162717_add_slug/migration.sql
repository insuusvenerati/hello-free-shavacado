/*
  Warnings:

  - Added the required column `family` to the `groceries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `groceries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "groceries" ADD COLUMN     "family" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;
