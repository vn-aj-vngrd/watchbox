import { createProtectedRouter } from "./protected-router";
import { z } from "zod";

export const userRouter = createProtectedRouter()
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
      name: z.string(),
      url: z.string(),
    }),
    async resolve({ ctx, input }) {
      return ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          username: input.username,
          name: input.name,
          image: input.url,
        },
      });
    },
  })
  .mutation("deleteUser", {
    async resolve({ ctx }) {
      return ctx.prisma.user.delete({
        where: {
          id: ctx.session.user.id,
        },
      });
    },
  });
