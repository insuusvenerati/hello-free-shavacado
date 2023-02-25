/*
  Warnings:

  - You are about to drop the column `importedRecipeId` on the `ImportedRecipeCategory` table. All the data in the column will be lost.
  - You are about to drop the column `importedRecipeId` on the `ImportedRecipeCuisine` table. All the data in the column will be lost.
  - You are about to drop the column `importedRecipeId` on the `ImportedRecipeIngredient` table. All the data in the column will be lost.
  - You are about to drop the column `importedRecipeId` on the `ImportedRecipeKeyword` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ImportedRecipeCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_ImportedRecipeCategory" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "ImportedRecipeCategory";
DROP TABLE "ImportedRecipeCategory";
ALTER TABLE "new_ImportedRecipeCategory" RENAME TO "ImportedRecipeCategory";
CREATE UNIQUE INDEX "ImportedRecipeCategory_name_key" ON "ImportedRecipeCategory"("name");
CREATE TABLE "new_ImportedRecipeCuisine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_ImportedRecipeCuisine" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "ImportedRecipeCuisine";
DROP TABLE "ImportedRecipeCuisine";
ALTER TABLE "new_ImportedRecipeCuisine" RENAME TO "ImportedRecipeCuisine";
CREATE UNIQUE INDEX "ImportedRecipeCuisine_name_key" ON "ImportedRecipeCuisine"("name");
CREATE TABLE "new_ImportedRecipeIngredient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_ImportedRecipeIngredient" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "ImportedRecipeIngredient";
DROP TABLE "ImportedRecipeIngredient";
ALTER TABLE "new_ImportedRecipeIngredient" RENAME TO "ImportedRecipeIngredient";
CREATE UNIQUE INDEX "ImportedRecipeIngredient_name_key" ON "ImportedRecipeIngredient"("name");
CREATE TABLE "new_ImportedRecipeKeyword" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_ImportedRecipeKeyword" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "ImportedRecipeKeyword";
DROP TABLE "ImportedRecipeKeyword";
ALTER TABLE "new_ImportedRecipeKeyword" RENAME TO "ImportedRecipeKeyword";
CREATE UNIQUE INDEX "ImportedRecipeKeyword_name_key" ON "ImportedRecipeKeyword"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
