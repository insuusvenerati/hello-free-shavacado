-- CreateTable
CREATE TABLE "allergen" (
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "id" TEXT NOT NULL DEFAULT fn_ksuid(),
    "type" TEXT,
    "description" TEXT,
    "tracesOf" BOOLEAN,
    "triggersTracesOf" BOOLEAN,
    "iconLink" TEXT,
    "iconPath" TEXT,
    "usage" INTEGER,
    "name" TEXT,
    "slug" TEXT,

    CONSTRAINT "allergen_pkey" PRIMARY KEY ("id")
);
