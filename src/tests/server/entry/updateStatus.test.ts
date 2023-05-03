import { test, expect } from "@jest/globals";
import { Entry, PrismaClient } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { getCaller } from "..";

test("Update Status", async () => {
  const prismaMock = mockDeep<PrismaClient>();

  const mockOutput: Entry = {
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
  };

  prismaMock.entry.update.mockResolvedValue(mockOutput);

  const result = await getCaller(prismaMock).mutation("entry.updateStatus", {
    id: "test-id",
    status: 1,
  });

  expect(result).toStrictEqual(mockOutput);
});
