import { test, expect } from "@jest/globals";
import { PrismaClient, Prisma } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { getCaller } from "..";

test("Delete Favorite Box", async () => {
  const prismaMock = mockDeep<PrismaClient>();

  const mockOutput: Prisma.BatchPayload = {
    count: 1,
  };

  prismaMock.favoriteBox.deleteMany.mockResolvedValue(mockOutput);

  const result = await getCaller(prismaMock).mutation("favorite.deleteFavoriteBox", {
    boxId: "test-box-id",
  });

  expect(result).toStrictEqual(mockOutput);
});
