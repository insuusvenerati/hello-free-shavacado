-- CreateTable
CREATE TABLE "_FavoriteRecipeToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_FavoriteRecipeToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "FavoriteRecipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FavoriteRecipeToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FavoriteRecipe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    CONSTRAINT "FavoriteRecipe_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FavoriteRecipe" ("id", "recipeId", "userId") SELECT "id", "recipeId", "userId" FROM "FavoriteRecipe";
DROP TABLE "FavoriteRecipe";
ALTER TABLE "new_FavoriteRecipe" RENAME TO "FavoriteRecipe";
CREATE UNIQUE INDEX "FavoriteRecipe_recipeId_key" ON "FavoriteRecipe"("recipeId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteRecipeToUser_AB_unique" ON "_FavoriteRecipeToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteRecipeToUser_B_index" ON "_FavoriteRecipeToUser"("B");
