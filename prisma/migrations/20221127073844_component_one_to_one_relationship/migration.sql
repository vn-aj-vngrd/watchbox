/*
  Warnings:

  - You are about to drop the column `entryTitle` on the `Entry` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[componentId]` on the table `Divider` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[componentId]` on the table `Entry` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[componentId]` on the table `Text` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "entryTitle";
ALTER TABLE "Entry" ADD COLUMN     "title" STRING NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Divider_componentId_key" ON "Divider"("componentId");

-- CreateIndex
CREATE UNIQUE INDEX "Entry_componentId_key" ON "Entry"("componentId");

-- CreateIndex
CREATE UNIQUE INDEX "Text_componentId_key" ON "Text"("componentId");
