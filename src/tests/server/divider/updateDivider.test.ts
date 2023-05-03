import { test, expect } from "@jest/globals";
import { Divider, PrismaClient } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { getCaller } from "..";

test("Update Divider", async () => {
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

  prismaMock.divider.update.mockResolvedValue(mockOutput);

  const result = await getCaller(prismaMock).mutation("divider.updateDivider", {
    id: "test-box-id",
    orientation: "test-orientation",
    height: 0,
    width: 0,
  });

  expect(result).toStrictEqual(mockOutput);
});
