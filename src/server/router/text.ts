import { z } from "zod";
import { createProtectedRouter } from "./protected-router";

export const textRouter = createProtectedRouter()
  .query("getText", {
    input: z.object({
      id: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      return ctx.prisma.component.findFirst({
        where: {
          id: input.id,
          box: {
            userId: ctx.session.user.id,
          },
        },
        include: {
          text: true,
        },
      });
    },
  })
  .mutation("createText", {
    input: z.object({
      componentId: z.string(),
      content: z.string(),
    }),
    async resolve({ input, ctx }) {
      return ctx.prisma.text.create({
        data: {
          componentId: input.componentId,
          content: input.content,
        },
      });
    },
  })
  .mutation("updateText", {
    input: z.object({
      id: z.string(),
      content: z.string(),
    }),
    async resolve({ input, ctx }) {
      return ctx.prisma.text.update({
        where: {
          id: input.id,
        },
        data: {
          content: input.content,
        },
      });
    },
  });
