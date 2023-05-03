import { test, expect } from "@jest/globals";
import { Component, Divider, Entry, PrismaClient, Text } from "@prisma/client";
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
      divider: {
        id: "test-divider-id",
        componentId: "test-component-id",
        orientation: "test-orientation",
        height: 0,
        width: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
    },
  ];

  prismaMock.component.findMany.mockResolvedValue(mockOutput);

  const result = await getCaller(prismaMock).query("component.getComponents", {
    id: "test-id",
  });

  expect(result).toStrictEqual(mockOutput);
});
