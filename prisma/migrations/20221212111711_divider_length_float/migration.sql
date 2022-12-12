/*
  Warnings:

  - Changed the type of `length` on the `Divider` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Divider" DROP COLUMN "length";
ALTER TABLE "Divider" ADD COLUMN     "length" FLOAT8 NOT NULL;
