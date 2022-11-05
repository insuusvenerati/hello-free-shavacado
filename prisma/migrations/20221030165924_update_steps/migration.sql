/*
  Warnings:

  - The primary key for the `Step` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Step` table. All the data in the column will be lost.
  - You are about to drop the column `stepId` on the `Ingredient` table. All the data in the column will be lost.
  - Made the column `recipeId` on table `Step` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `stepIndex` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stepRecipeId` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Made the column `recipeId` on table `Ingredient` required. This step will fail if there are existing NULL values in that column.
  - Made the column `recipeId` on table `Tag` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Step" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "caption" TEXT,
    "index" INTEGER NOT NULL,
    "image" TEXT,
    "instructions" TEXT NOT NULL,
    "instructionsHTML" TEXT NOT NULL,
    "instructionsMarkdown" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,

    PRIMARY KEY ("recipeId", "index"),
    CONSTRAINT "Step_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Step" ("caption", "createdAt", "image", "index", "instructions", "instructionsHTML", "instructionsMarkdown", "recipeId", "updatedAt") SELECT "caption", "createdAt", "image", "index", "instructions", "instructionsHTML", "instructionsMarkdown", "recipeId", "updatedAt" FROM "Step";
DROP TABLE "Step";
ALTER TABLE "new_Step" RENAME TO "Step";
CREATE TABLE "new_Ingredient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "stepRecipeId" TEXT NOT NULL,
    "stepIndex" INTEGER NOT NULL,
    CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Ingredient_stepRecipeId_stepIndex_fkey" FOREIGN KEY ("stepRecipeId", "stepIndex") REFERENCES "Step" ("recipeId", "index") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ingredient" ("createdAt", "id", "name", "recipeId", "updatedAt") SELECT "createdAt", "id", "name", "recipeId", "updatedAt" FROM "Ingredient";
DROP TABLE "Ingredient";
ALTER TABLE "new_Ingredient" RENAME TO "Ingredient";
CREATE TABLE "new_Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    CONSTRAINT "Tag_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Tag" ("createdAt", "id", "name", "recipeId", "updatedAt") SELECT "createdAt", "id", "name", "recipeId", "updatedAt" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
