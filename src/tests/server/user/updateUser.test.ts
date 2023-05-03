import { test, expect } from "@jest/globals";
import { PrismaClient, User } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { getCaller } from "..";

test("Update User", async () => {
  const prismaMock = mockDeep<PrismaClient>();

  const mockOutput: User = {
    id: "test-id",
    name: "test-name",
    username: "test-username",
    email: "test-email",
    emailVerified: new Date(),
    image: "test-image",
    isNewUser: false,
    created_at: new Date(),
    updated_at: new Date(),
  };

  prismaMock.user.update.mockResolvedValue(mockOutput);

  const result = await getCaller(prismaMock).mutation("user.updateUser", {
    username: "test-username",
    name: "test-name",
    url: "test-url",
  });

  expect(result).toStrictEqual(mockOutput);
});
