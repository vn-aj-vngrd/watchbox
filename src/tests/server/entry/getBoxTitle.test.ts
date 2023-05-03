import { test, expect } from "@jest/globals";
import { PrismaClient, Box } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { getCaller } from "..";

test("Get Box Title", async () => {
  const prismaMock = mockDeep<PrismaClient>();

  const mockOutput: Box = {
    id: "test-id",
    boxTitle: "test-box-title",
    isPublic: false,
    userId: "test-user-id",
    created_at: new Date(),
    updated_at: new Date(),
  };

  prismaMock.box.findFirst.mockResolvedValue(mockOutput);

  const result = await getCaller(prismaMock).query("entry.getBoxTitle", {
    id: "test-id",
  });

  expect(result).toStrictEqual(mockOutput);
});
