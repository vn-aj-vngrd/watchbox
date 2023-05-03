import { test, expect } from "@jest/globals";
import { PrismaClient, FavoriteBox } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { getCaller } from "..";

test("Add Favorite Box", async () => {
  const prismaMock = mockDeep<PrismaClient>();

  const mockOutput: FavoriteBox = {
    id: "test-id",
    userId: "test-user-id",
    boxId: "test-box-id",
    created_at: new Date(),
  };

  prismaMock.favoriteBox.create.mockResolvedValue(mockOutput);

  const result = await getCaller(prismaMock).mutation("favorite.addFavoriteBox", {
    boxId: "test-box-id",
  });

  expect(result).toStrictEqual(mockOutput);
});
