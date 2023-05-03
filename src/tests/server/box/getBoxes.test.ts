import { test, expect } from "@jest/globals";
import { Box, PrismaClient } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { getCaller } from "..";

test("Get Boxes", async () => {
  const prismaMock = mockDeep<PrismaClient>();

  const mockOutput: Box[] = [
    {
      id: "test-id",
      userId: "test-user-id",
      boxTitle: "test-user-name",
      isPublic: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  prismaMock.box.findMany.mockResolvedValue(mockOutput);

  const result = await getCaller(prismaMock).query("box.getBoxes", {
    skip: 0,
    take: 10,
    searchParam: null,
    sortParam: "Newest",
  });

  expect(result).toHaveLength(mockOutput.length);
  expect(result).toStrictEqual(mockOutput);
});
