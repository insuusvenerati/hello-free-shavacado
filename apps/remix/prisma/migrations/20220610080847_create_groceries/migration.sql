-- CreateTable
CREATE TABLE "groceries" (
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ingredient" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "image_path" TEXT,
    "id" TEXT NOT NULL DEFAULT fn_ksuid(),

    CONSTRAINT "groceries_pkey" PRIMARY KEY ("id")
);
