/*
  Warnings:

  - The `rating` column on the `Entry` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "rating";
ALTER TABLE "Entry" ADD COLUMN     "rating" FLOAT8 NOT NULL DEFAULT 0;
