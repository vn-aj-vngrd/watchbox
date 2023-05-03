import { test, expect } from "@jest/globals";
import { PrismaClient, Box } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { getCaller } from "..";

test("Update Box", async () => {
  const prismaMock = mockDeep<PrismaClient>();

  const mockOutput: Box = {
    id: "test-box-id",
    boxTitle: "test-box-title",
    isPublic: false,
    userId: "test-user-id",
    created_at: new Date(),
    updated_at: new Date(),
  };

  prismaMock.box.update.mockResolvedValue(mockOutput);

  const result = await getCaller(prismaMock).mutation("box.updateBox", {
    id: "test-box-id",
    boxTitle: "test-box-title",
    isPublic: false,
  });

  expect(result).toStrictEqual(mockOutput);
});
