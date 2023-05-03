import { test, expect } from "@jest/globals";
import { PrismaClient, Box } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { getCaller } from "..";

test("Create Box", async () => {
  const prismaMock = mockDeep<PrismaClient>();

  const mockOutput: Box = {
    id: "test-id",
    boxTitle: "test-box-title",
    isPublic: false,
    userId: "test-user-id",
    created_at: new Date(),
    updated_at: new Date(),
  };

  prismaMock.box.create.mockResolvedValue(mockOutput);

  const result = await getCaller(prismaMock).mutation("box.createBox", {
    boxTitle: "test-box-title",
  });

  expect(result).toStrictEqual(mockOutput);
});
