-- CreateTable
CREATE TABLE "popular_recipe" (
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "name" TEXT,
    "recipe" JSONB,
    "id" TEXT NOT NULL DEFAULT fn_ksuid(),

    CONSTRAINT "popular_recipe_pkey" PRIMARY KEY ("id")
);
