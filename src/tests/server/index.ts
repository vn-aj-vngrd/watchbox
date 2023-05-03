import { DeepMockProxy } from "jest-mock-extended";
import { appRouter } from "../../server/router";
import { type Session } from "next-auth";
import { PrismaClient, Prisma } from "@prisma/client";

const mockSession: Session = {
  user: {
    id: "test-user-id",
    isNewUser: false,
    username: "test-user-name",
  },
  expires: "",
};

export const getCaller = (
  prismaMock: DeepMockProxy<
    PrismaClient<
      Prisma.PrismaClientOptions,
      never,
      Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    >
  >,
) => {
  return appRouter.createCaller({
    prisma: prismaMock,
    session: mockSession,
  });
};
