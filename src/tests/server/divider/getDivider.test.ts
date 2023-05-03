import { test, expect } from "@jest/globals";
import { Divider, PrismaClient, Component } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { getCaller } from "..";

test("Get Divider", async () => {
  const prismaMock = mockDeep<PrismaClient>();

  const mockOutput: Component & {
    divider: Divider | null;
  } = {
    id: "test-id",
    boxId: "test-box-id",
    componentName: "test-component-name",
    xAxis: 0,
    yAxis: 0,
    created_at: new Date(),
    updated_at: new Date(),
    divider: null,
  };

  prismaMock.component.findFirst.mockResolvedValue(mockOutput);

  const result = await getCaller(prismaMock).query("divider.getDivider", {
    id: "test-box-id",
  });

  expect(result).toStrictEqual(mockOutput);
});
