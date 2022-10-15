/*
  Warnings:

  - You are about to drop the column `componentId` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the `Pin` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `boxId` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xAxis` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yAxis` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "componentId";
ALTER TABLE "Entry" ADD COLUMN     "boxId" STRING NOT NULL;
ALTER TABLE "Entry" ADD COLUMN     "xAxis" INT4 NOT NULL;
ALTER TABLE "Entry" ADD COLUMN     "yAxis" INT4 NOT NULL;

-- DropTable
DROP TABLE "Pin";

-- CreateTable
CREATE TABLE "Favorite" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "favoriteId" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);
