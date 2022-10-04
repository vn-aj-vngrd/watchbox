import { createProtectedRouter } from "./protected-router";
import { z } from "zod";

export const authRouter = createProtectedRouter()
  .mutation("getStarted", {
    input: z.object({
      username: z.string(),
    }),
    async resolve({ ctx, input }) {
      const check = await ctx.prisma.user.findUnique({
        where: {
          username: input.username,
        },
      });

      if (check) {
        throw new Error("* Username already taken");
      }

      return ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          isNewUser: false,
          username: input.username,
        },
      });
    },
  })
  .mutation("updateUser", {
    input: z.object({
      username: z.string(),
      image: z.string(),
    }),
    async resolve({ ctx, input }) {
      return ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          username: input.username,
          image: input.image,
        },
      });
    },
  });
