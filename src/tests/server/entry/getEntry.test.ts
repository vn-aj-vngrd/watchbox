import { test, expect } from "@jest/globals";
import { Entry, PrismaClient, Component } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { getCaller } from "..";

test("Get Entry", async () => {
  const prismaMock = mockDeep<PrismaClient>();

  const mockOutput: Component & {
    entry: Entry | null;
  } = {
    id: "test-id",
    boxId: "test-box-id",
    componentName: "test-component-name",
    xAxis: 0,
    yAxis: 0,
    created_at: new Date(),
    updated_at: new Date(),
    entry: {
      id: "test-id",
      componentId: "test-component-id",
      movieId: "test-movie-id",
      image: "test-image",
      title: "test-title",
      note: "test-note",
      review: "test-review",
      status: 0,
      rating: 0,
      created_at: new Date(),
      updated_at: new Date(),
    },
  };

  prismaMock.component.findFirst.mockResolvedValue(mockOutput);

  const result = await getCaller(prismaMock).query("entry.getEntry", {
    id: "test-id",
  });

  expect(result).toStrictEqual(mockOutput);
});
