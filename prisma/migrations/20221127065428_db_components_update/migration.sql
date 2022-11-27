/*
  Warnings:

  - You are about to drop the column `boxId` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `xAxis` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `yAxis` on the `Entry` table. All the data in the column will be lost.
  - Added the required column `componentId` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movieId` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "boxId";
ALTER TABLE "Entry" DROP COLUMN "xAxis";
ALTER TABLE "Entry" DROP COLUMN "yAxis";
ALTER TABLE "Entry" ADD COLUMN     "componentId" STRING NOT NULL;
ALTER TABLE "Entry" ADD COLUMN     "movieId" STRING NOT NULL;

-- CreateTable
CREATE TABLE "Text" (
    "id" STRING NOT NULL,
    "componentId" STRING NOT NULL,
    "content" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Text_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Divider" (
    "id" STRING NOT NULL,
    "componentId" STRING NOT NULL,
    "orientation" STRING NOT NULL,
    "length" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Divider_pkey" PRIMARY KEY ("id")
);
