/*
  Warnings:

  - Made the column `userId` on table `FavoriteRecipe` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FavoriteRecipe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    CONSTRAINT "FavoriteRecipe_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FavoriteRecipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FavoriteRecipe" ("id", "recipeId", "userId") SELECT "id", "recipeId", "userId" FROM "FavoriteRecipe";
DROP TABLE "FavoriteRecipe";
ALTER TABLE "new_FavoriteRecipe" RENAME TO "FavoriteRecipe";
CREATE UNIQUE INDEX "FavoriteRecipe_recipeId_key" ON "FavoriteRecipe"("recipeId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
