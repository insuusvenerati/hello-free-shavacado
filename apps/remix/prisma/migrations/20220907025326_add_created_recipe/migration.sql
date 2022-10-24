-- CreateTable
CREATE TABLE "created_recipe" (
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "id" TEXT NOT NULL DEFAULT fn_ksuid(),
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ingredients" TEXT[],
    "Steps" TEXT[],
    "Difficulty" TEXT,
    "Tags" TEXT[],

    CONSTRAINT "created_recipe_pkey" PRIMARY KEY ("id")
);
