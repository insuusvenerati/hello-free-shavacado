/*
  Warnings:

  - The primary key for the `ImportedRecipeCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ImportedRecipeCategory` table. All the data in the column will be lost.
  - The primary key for the `ImportedRecipeCuisine` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ImportedRecipeCuisine` table. All the data in the column will be lost.
  - The primary key for the `ImportedRecipeKeyword` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ImportedRecipeKeyword` table. All the data in the column will be lost.
  - The primary key for the `ImportedRecipeIngredient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ImportedRecipeIngredient` table. All the data in the column will be lost.
  - The primary key for the `ImportedRecipeStep` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ImportedRecipeStep` table. All the data in the column will be lost.
  - Made the column `importedRecipeId` on table `ImportedRecipeCategory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `importedRecipeId` on table `ImportedRecipeCuisine` required. This step will fail if there are existing NULL values in that column.
  - Made the column `importedRecipeId` on table `ImportedRecipeKeyword` required. This step will fail if there are existing NULL values in that column.
  - Made the column `importedRecipeId` on table `ImportedRecipeIngredient` required. This step will fail if there are existing NULL values in that column.
  - Made the column `importedRecipeId` on table `ImportedRecipeStep` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ImportedRecipeCategory" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "importedRecipeId" TEXT NOT NULL,

    PRIMARY KEY ("importedRecipeId", "name"),
    CONSTRAINT "ImportedRecipeCategory_importedRecipeId_fkey" FOREIGN KEY ("importedRecipeId") REFERENCES "ImportedRecipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ImportedRecipeCategory" ("createdAt", "importedRecipeId", "name", "updatedAt") SELECT "createdAt", "importedRecipeId", "name", "updatedAt" FROM "ImportedRecipeCategory";
DROP TABLE "ImportedRecipeCategory";
ALTER TABLE "new_ImportedRecipeCategory" RENAME TO "ImportedRecipeCategory";
CREATE UNIQUE INDEX "ImportedRecipeCategory_name_key" ON "ImportedRecipeCategory"("name");
CREATE TABLE "new_ImportedRecipeCuisine" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "importedRecipeId" TEXT NOT NULL,

    PRIMARY KEY ("importedRecipeId", "name"),
    CONSTRAINT "ImportedRecipeCuisine_importedRecipeId_fkey" FOREIGN KEY ("importedRecipeId") REFERENCES "ImportedRecipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ImportedRecipeCuisine" ("createdAt", "importedRecipeId", "name", "updatedAt") SELECT "createdAt", "importedRecipeId", "name", "updatedAt" FROM "ImportedRecipeCuisine";
DROP TABLE "ImportedRecipeCuisine";
ALTER TABLE "new_ImportedRecipeCuisine" RENAME TO "ImportedRecipeCuisine";
CREATE UNIQUE INDEX "ImportedRecipeCuisine_name_key" ON "ImportedRecipeCuisine"("name");
CREATE TABLE "new_ImportedRecipeKeyword" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "importedRecipeId" TEXT NOT NULL,

    PRIMARY KEY ("importedRecipeId", "name"),
    CONSTRAINT "ImportedRecipeKeyword_importedRecipeId_fkey" FOREIGN KEY ("importedRecipeId") REFERENCES "ImportedRecipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ImportedRecipeKeyword" ("createdAt", "importedRecipeId", "name", "updatedAt") SELECT "createdAt", "importedRecipeId", "name", "updatedAt" FROM "ImportedRecipeKeyword";
DROP TABLE "ImportedRecipeKeyword";
ALTER TABLE "new_ImportedRecipeKeyword" RENAME TO "ImportedRecipeKeyword";
CREATE UNIQUE INDEX "ImportedRecipeKeyword_name_key" ON "ImportedRecipeKeyword"("name");
CREATE TABLE "new_ImportedRecipeIngredient" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "importedRecipeId" TEXT NOT NULL,

    PRIMARY KEY ("importedRecipeId", "name"),
    CONSTRAINT "ImportedRecipeIngredient_importedRecipeId_fkey" FOREIGN KEY ("importedRecipeId") REFERENCES "ImportedRecipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ImportedRecipeIngredient" ("createdAt", "importedRecipeId", "name", "updatedAt") SELECT "createdAt", "importedRecipeId", "name", "updatedAt" FROM "ImportedRecipeIngredient";
DROP TABLE "ImportedRecipeIngredient";
ALTER TABLE "new_ImportedRecipeIngredient" RENAME TO "ImportedRecipeIngredient";
CREATE UNIQUE INDEX "ImportedRecipeIngredient_name_key" ON "ImportedRecipeIngredient"("name");
CREATE TABLE "new_ImportedRecipeStep" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "index" INTEGER NOT NULL,
    "caption" TEXT NOT NULL,
    "importedRecipeId" TEXT NOT NULL,

    PRIMARY KEY ("importedRecipeId", "index"),
    CONSTRAINT "ImportedRecipeStep_importedRecipeId_fkey" FOREIGN KEY ("importedRecipeId") REFERENCES "ImportedRecipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ImportedRecipeStep" ("caption", "createdAt", "importedRecipeId", "index", "updatedAt") SELECT "caption", "createdAt", "importedRecipeId", "index", "updatedAt" FROM "ImportedRecipeStep";
DROP TABLE "ImportedRecipeStep";
ALTER TABLE "new_ImportedRecipeStep" RENAME TO "ImportedRecipeStep";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
