/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `groceries` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "groceries" ADD COLUMN     "uuid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "groceries_uuid_key" ON "groceries"("uuid");
