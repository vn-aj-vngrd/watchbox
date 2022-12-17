/*
  Warnings:

  - You are about to drop the column `length` on the `Divider` table. All the data in the column will be lost.
  - Added the required column `height` to the `Divider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `Divider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Divider" DROP COLUMN "length";
ALTER TABLE "Divider" ADD COLUMN     "height" FLOAT8 NOT NULL;
ALTER TABLE "Divider" ADD COLUMN     "width" FLOAT8 NOT NULL;
