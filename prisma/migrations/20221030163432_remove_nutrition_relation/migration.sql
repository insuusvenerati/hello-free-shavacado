/*
  Warnings:

  - You are about to drop the `Nutrition` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nutrition` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Nutrition";
PRAGMA foreign_keys=on;

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
    "nutrition" TEXT NOT NULL,
    "userId" TEXT,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "Recipe_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Recipe" ("averageRating", "categoryId", "cookTime", "createdAt", "description", "difficulty", "favoritesCount", "id", "imagePath", "name", "prepTime", "ratingsCount", "seoDescription", "totalTime", "updatedAt", "userId") SELECT "averageRating", "categoryId", "cookTime", "createdAt", "description", "difficulty", "favoritesCount", "id", "imagePath", "name", "prepTime", "ratingsCount", "seoDescription", "totalTime", "updatedAt", "userId" FROM "Recipe";
DROP TABLE "Recipe";
ALTER TABLE "new_Recipe" RENAME TO "Recipe";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
