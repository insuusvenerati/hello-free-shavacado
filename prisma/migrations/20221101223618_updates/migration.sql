/*
  Warnings:

  - Added the required column `slug` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "imageUrl" TEXT;

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
    "slug" TEXT NOT NULL,
    "nutrition" TEXT NOT NULL,
    "categoryId" TEXT,
    CONSTRAINT "Recipe_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Recipe" ("averageRating", "categoryId", "cookTime", "createdAt", "description", "difficulty", "favoritesCount", "id", "imagePath", "name", "nutrition", "prepTime", "ratingsCount", "seoDescription", "totalTime", "updatedAt") SELECT "averageRating", "categoryId", "cookTime", "createdAt", "description", "difficulty", "favoritesCount", "id", "imagePath", "name", "nutrition", "prepTime", "ratingsCount", "seoDescription", "totalTime", "updatedAt" FROM "Recipe";
DROP TABLE "Recipe";
ALTER TABLE "new_Recipe" RENAME TO "Recipe";
CREATE UNIQUE INDEX "Recipe_slug_key" ON "Recipe"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
