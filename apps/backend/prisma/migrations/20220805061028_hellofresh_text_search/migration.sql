-- AlterTable
ALTER TABLE "hellofresh"
ADD COLUMN "description" TEXT,
  ADD COLUMN "textSearch" TSVECTOR GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(name, '')), 'A') || setweight(
      to_tsvector('english', coalesce(description, '')),
      'B'
    )
  ) STORED;
-- CreateIndex
CREATE INDEX "hellofresh_textSearch_idx" ON "hellofresh" USING GIN ("textSearch");