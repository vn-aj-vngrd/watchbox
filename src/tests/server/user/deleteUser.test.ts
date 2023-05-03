import { test, expect } from "@jest/globals";
import { PrismaClient, User } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { getCaller } from "..";

test("Delete User", async () => {
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

  prismaMock.user.delete.mockResolvedValue(mockOutput);

  const result = await getCaller(prismaMock).mutation("user.deleteUser");

  expect(result).toStrictEqual(mockOutput);
});
