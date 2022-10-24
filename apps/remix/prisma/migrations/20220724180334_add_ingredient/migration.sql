-- CreateTable
CREATE TABLE "Ingredient" (
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "id" TEXT NOT NULL DEFAULT fn_ksuid(),
    "country" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "internal_name" TEXT NOT NULL,
    "shipped" BOOLEAN NOT NULL,
    "image_link" TEXT NOT NULL,
    "image_path" TEXT NOT NULL,
    "usage" INTEGER NOT NULL,
    "hasDuplicatedName" BOOLEAN NOT NULL,
    "allergens" TEXT[],
    "family" TEXT[],
    "uuid" TEXT NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);
