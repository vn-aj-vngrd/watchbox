-- AlterTable
ALTER TABLE "Entry" ALTER COLUMN "note" DROP NOT NULL;
ALTER TABLE "Entry" ALTER COLUMN "review" DROP NOT NULL;
ALTER TABLE "Entry" ALTER COLUMN "rating" SET DEFAULT 0;
ALTER TABLE "Entry" ALTER COLUMN "status" SET DEFAULT 0;