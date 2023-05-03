import { test, expect } from "@jest/globals";
import { Box, PrismaClient, User } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { getCaller } from "..";

test("Get Box", async () => {
  const prismaMock = mockDeep<PrismaClient>();

  const mockOutput: User & {
    boxes: Box[];
  } = {
    boxes: [
      {
        id: "test-box-id",
        userId: "test-user-id",
        boxTitle: "test-box-title",
        isPublic: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    created_at: new Date(),
    email: "test-email",
    id: "test-id",
    image: "test-image",
    emailVerified: new Date(),
    isNewUser: false,
    name: "test-name",
    updated_at: new Date(),
    username: "test-username",
  };

  prismaMock.user.findFirst.mockResolvedValue(mockOutput);

  const result = await getCaller(prismaMock).query("box.getBox", {
    id: "",
  });

  expect(result).toStrictEqual(mockOutput);
});
