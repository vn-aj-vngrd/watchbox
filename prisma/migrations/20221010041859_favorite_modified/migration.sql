/*
  Warnings:

  - You are about to drop the `Favorite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Favorite";

-- CreateTable
CREATE TABLE "FavoriteBox" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "boxId" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteBox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteEntry" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "entryId" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteEntry_pkey" PRIMARY KEY ("id")
);
