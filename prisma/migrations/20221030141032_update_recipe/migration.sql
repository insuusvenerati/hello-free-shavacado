-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Recipe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "seoDescription" TEXT,
    "imagePath" TEXT NOT NULL,
    "ratingsCount" INTEGER,
    "averageRating" REAL,
    "favoritesCount" INTEGER,
    "totalTime" TEXT,
    "prepTime" TEXT,
    "cookTime" TEXT,
    "userId" TEXT,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "Recipe_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Recipe" ("averageRating", "categoryId", "cookTime", "createdAt", "description", "difficulty", "favoritesCount", "id", "imagePath", "name", "prepTime", "ratingsCount", "seoDescription", "totalTime", "updatedAt", "userId") SELECT "averageRating", "categoryId", "cookTime", "createdAt", "description", "difficulty", "favoritesCount", "id", "imagePath", "name", "prepTime", "ratingsCount", "seoDescription", "totalTime", "updatedAt", "userId" FROM "Recipe";
DROP TABLE "Recipe";
ALTER TABLE "new_Recipe" RENAME TO "Recipe";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
