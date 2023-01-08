-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ImportedRecipe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT NOT NULL,
    "cookTime" TEXT,
    "prepTime" TEXT,
    "totalTime" TEXT,
    "recipeYield" TEXT NOT NULL,
    "cookTimeOriginalFormat" TEXT,
    "prepTimeOriginalFormat" TEXT,
    "totalTimeOriginalFormat" TEXT,
    "url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "ImportedRecipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ImportedRecipe" ("cookTime", "cookTimeOriginalFormat", "createdAt", "description", "id", "image", "name", "prepTime", "prepTimeOriginalFormat", "recipeYield", "totalTime", "totalTimeOriginalFormat", "updatedAt", "url", "userId") SELECT "cookTime", "cookTimeOriginalFormat", "createdAt", "description", "id", "image", "name", "prepTime", "prepTimeOriginalFormat", "recipeYield", "totalTime", "totalTimeOriginalFormat", "updatedAt", "url", "userId" FROM "ImportedRecipe";
DROP TABLE "ImportedRecipe";
ALTER TABLE "new_ImportedRecipe" RENAME TO "ImportedRecipe";
CREATE UNIQUE INDEX "ImportedRecipe_url_key" ON "ImportedRecipe"("url");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
