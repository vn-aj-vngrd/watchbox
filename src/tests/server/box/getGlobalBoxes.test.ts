import { test, expect } from "@jest/globals";
import { PrismaClient, Box, Component, Entry } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { getCaller } from "..";

test("Get Global Boxes", async () => {
  const prismaMock = mockDeep<PrismaClient>();

  const mockOutput: (Box & {
    components: (Component & {
      entry: Entry | null;
    })[];
  })[] = [
    {
      id: "test-id",
      userId: "test-user-id",
      boxTitle: "test-box-title",
      isPublic: true,
      created_at: new Date(),
      updated_at: new Date(),
      components: [
        {
          id: "test-id",
          boxId: "test-box-id",
          componentName: "test-component-type",
          xAxis: 1,
          yAxis: 2,
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
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
    },
  ];

  prismaMock.box.findMany.mockResolvedValue(mockOutput);

  const result = await getCaller(prismaMock).mutation("box.getGlobalBoxes", {
    searchInput: "test-search-input",
    take: 1,
  });

  expect(result).toStrictEqual(mockOutput);
});