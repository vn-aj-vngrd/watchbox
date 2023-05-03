import { test, expect } from "@jest/globals";
import { Component, PrismaClient } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { getCaller } from "..";

test("Create Component", async () => {
  const prismaMock = mockDeep<PrismaClient>();

  const mockOutput: Component = {
    id: "test-component-id",
    boxId: "test-box-id",
    componentName: "test-component-name",
    xAxis: 0,
    yAxis: 0,
    created_at: new Date(),
    updated_at: new Date(),
  };

  prismaMock.component.create.mockResolvedValue(mockOutput);

  const result = await getCaller(prismaMock).mutation("component.createComponent", {
    boxId: "test-box-id",
    componentName: "test-component-name",
    xAxis: 0,
    yAxis: 0,
  });

  expect(result).toStrictEqual(mockOutput);
});
