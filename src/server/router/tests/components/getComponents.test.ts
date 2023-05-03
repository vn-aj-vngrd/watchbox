import { test, expect } from "@jest/globals";
import { Component, Divider, Entry, PrismaClient } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { getCaller } from "..";

test("Get Components", async () => {
  const prismaMock = mockDeep<PrismaClient>();

  const mockOutput: (Component & {
    text: Text | null;
    entry: Entry | null;
    divider: Divider | null;
  })[] = [
    {
      id: "test-component-id",
      boxId: "test-box-id",
      componentName: "test-component-name",
      xAxis: 0,
      yAxis: 0,
      created_at: new Date(),
      updated_at: new Date(),
      text: null,
      entry: null,
      divider: null,
    },
  ];

  prismaMock.component.findMany.mockResolvedValue(mockOutput);

  const result = await getCaller(prismaMock).query("component.getComponents", {
    id: "test-box-id",
  });

  expect(result).toStrictEqual(mockOutput);
});
