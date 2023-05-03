import { test, expect } from "@jest/globals";
import { PrismaClient, Text } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { getCaller } from "..";

test("Update Controls", async () => {
  const prismaMock = mockDeep<PrismaClient>();

  const mockOutput: Text = {
    id: "test-id",
    componentId: "test-component-id",
    content: "test-content",
    bold: false,
    italic: false,
    underline: false,
    alignment: 0,
    created_at: new Date(),
    updated_at: new Date(),
  };

  prismaMock.text.update.mockResolvedValue(mockOutput);

  const result = await getCaller(prismaMock).mutation("text.updateControls", {
    id: "test-id",
    bold: false,
    italic: false,
    underline: false,
    alignment: 0,
  });

  expect(result).toStrictEqual(mockOutput);
});
