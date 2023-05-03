import { test, expect } from "@jest/globals";
import { Divider, PrismaClient } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { getCaller } from "..";

test("Create Divider", async () => {
  const prismaMock = mockDeep<PrismaClient>();

  const mockOutput: Divider = {
    id: "test-divider-id",
    componentId: "test-component-id",
    orientation: "test-orientation",
    height: 0,
    width: 0,
    created_at: new Date(),
    updated_at: new Date(),
  };

  prismaMock.divider.create.mockResolvedValue(mockOutput);

  const result = await getCaller(prismaMock).mutation("divider.createDivider", {
    componentId: "test-component-id",
    orientation: "test-orientation",
    height: 0,
    width: 0,
  });

  expect(result).toStrictEqual(mockOutput);
});
