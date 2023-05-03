import { test, expect } from "@jest/globals";
import { PrismaClient, Component, Text } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { getCaller } from "..";

test("Get Text", async () => {
  const prismaMock = mockDeep<PrismaClient>();

  const mockOutput: Component & {
    text: Text | null;
  } = {
    id: "test-id",
    boxId: "test-box-id",
    componentName: "test-component-name",
    xAxis: 0,
    yAxis: 0,
    created_at: new Date(),
    updated_at: new Date(),
    text: {
      id: "test-id",
      componentId: "test-component-id",
      content: "test-content",
      bold: false,
      italic: false,
      underline: false,
      alignment: 0,
      created_at: new Date(),
      updated_at: new Date(),
    },
  };

  prismaMock.component.findFirst.mockResolvedValue(mockOutput);

  const result = await getCaller(prismaMock).query("text.getText", {
    id: "test-id",
  });

  expect(result).toStrictEqual(mockOutput);
});
