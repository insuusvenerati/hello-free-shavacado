/*
  Warnings:

  - Added the required column `slug` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ingredient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "imageLink" TEXT,
    "imagePath" TEXT,
    "recipeId" TEXT,
    "stepRecipeId" TEXT,
    "stepIndex" INTEGER,
    CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Ingredient_stepRecipeId_stepIndex_fkey" FOREIGN KEY ("stepRecipeId", "stepIndex") REFERENCES "Step" ("recipeId", "index") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Ingredient" ("createdAt", "id", "name", "recipeId", "stepIndex", "stepRecipeId", "updatedAt") SELECT "createdAt", "id", "name", "recipeId", "stepIndex", "stepRecipeId", "updatedAt" FROM "Ingredient";
DROP TABLE "Ingredient";
ALTER TABLE "new_Ingredient" RENAME TO "Ingredient";
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
