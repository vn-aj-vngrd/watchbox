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
      id: "test-box-id",
      userId: "test-user-id",
      boxTitle: "test-box-title",
      isPublic: true,
      created_at: new Date(),
      updated_at: new Date(),
      components: [
        {
          id: "test-component-id",
          boxId: "test-box-id",
          componentName: "test-component-type",
          xAxis: 1,
          yAxis: 2,
          entry: null,
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
