/*
  Warnings:

  - You are about to drop the column `userId` on the `FavoriteRecipe` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FavoriteRecipe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "recipeId" TEXT NOT NULL,
    CONSTRAINT "FavoriteRecipe_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FavoriteRecipe" ("id", "recipeId") SELECT "id", "recipeId" FROM "FavoriteRecipe";
DROP TABLE "FavoriteRecipe";
ALTER TABLE "new_FavoriteRecipe" RENAME TO "FavoriteRecipe";
CREATE UNIQUE INDEX "FavoriteRecipe_recipeId_key" ON "FavoriteRecipe"("recipeId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
