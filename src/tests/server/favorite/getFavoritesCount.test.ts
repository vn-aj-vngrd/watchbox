import { test, expect } from "@jest/globals";
import { PrismaClient } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { getCaller } from "..";

test("Get Favorites Count", async () => {
  const prismaMock = mockDeep<PrismaClient>();

  const mockOutput = 1;

  prismaMock.favoriteBox.count.mockResolvedValue(mockOutput);

  const result = await getCaller(prismaMock).query("favorite.getFavoritesCount");

  expect(result).toStrictEqual(mockOutput);
});
