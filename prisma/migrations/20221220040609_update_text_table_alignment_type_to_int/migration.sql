/*
  Warnings:

  - The `alignment` column on the `Text` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Text" DROP COLUMN "alignment";
ALTER TABLE "Text" ADD COLUMN     "alignment" INT4 NOT NULL DEFAULT 0;
