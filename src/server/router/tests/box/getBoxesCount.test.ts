import { test, expect } from "@jest/globals";
import { PrismaClient } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { getCaller } from "..";

test("Get Boxes Count", async () => {
  const prismaMock = mockDeep<PrismaClient>();

  const mockOutput = 1;

  prismaMock.box.count.mockResolvedValue(mockOutput);

  const result = await getCaller(prismaMock).query("box.getBoxesCount");

  expect(result).toStrictEqual(mockOutput);
});
