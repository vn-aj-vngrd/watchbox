import { createProtectedRouter } from "./protected-router";
import { z } from "zod";

export const authRouter = createProtectedRouter()
  .query("validateVerifyRequest", {
    input: z
      .object({
        email: z.string().email(),
      })
      .nullish(),
    async resolve({ input, ctx }) {
      return ctx.prisma.verificationToken.findMany({
        where: {
          identifier: input?.email,
        },
      });
    },
  })
  .mutation("getStarted", {
    async resolve({ ctx }) {
      return ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          isNewUser: false,
        },
      });
    },
  });
