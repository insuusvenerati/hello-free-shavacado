-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CreatedRecipe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "difficulty" TEXT,
    "ingredients" TEXT,
    "steps" TEXT,
    "imageUrl" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "CreatedRecipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CreatedRecipe" ("createdAt", "description", "difficulty", "id", "ingredients", "name", "steps", "updatedAt", "userId") SELECT "createdAt", "description", "difficulty", "id", "ingredients", "name", "steps", "updatedAt", "userId" FROM "CreatedRecipe";
DROP TABLE "CreatedRecipe";
ALTER TABLE "new_CreatedRecipe" RENAME TO "CreatedRecipe";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
