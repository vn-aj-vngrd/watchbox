import { z } from "zod";
import { createProtectedRouter } from "./protected-router";

export const dividerRouter = createProtectedRouter()
  .query("getDivider", {
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
          divider: true,
        },
      });
    },
  })
  .mutation("createDivider", {
    input: z.object({
      componentId: z.string(),
      orientation: z.string(),
      height: z.number(),
      width: z.number(),
    }),
    async resolve({ input, ctx }) {
      return ctx.prisma.divider.create({
        data: {
          componentId: input.componentId,
          orientation: input.orientation,
          height: input.height,
          width: input.width,
        },
      });
    },
  })
  .mutation("updateDivider", {
    input: z.object({
      id: z.string(),
      orientation: z.string(),
      height: z.number(),
      width: z.number(),
    }),
    async resolve({ input, ctx }) {
      return ctx.prisma.divider.update({
        where: {
          id: input.id,
        },
        data: {
          orientation: input.orientation,
          height: input.height,
          width: input.width,
        },
      });
    },
  });
