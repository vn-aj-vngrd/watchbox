import { z } from "zod";
import { createProtectedRouter } from "./protected-router";

export const componentRouter = createProtectedRouter()
  .query("getComponents", {
    input: z.object({
      id: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      return ctx.prisma.component.findMany({
        where: {
          boxId: input.id,
          box: {
            userId: ctx.session.user.id,
          },
        },
        include: {
          text: true,
          entry: true,
          divider: true,
        },
      });
    },
  })
  .mutation("createComponent", {
    input: z.object({
      boxId: z.string(),
      componentName: z.string(),
      xAxis: z.number(),
      yAxis: z.number(),
    }),
    async resolve({ input, ctx }) {
      return ctx.prisma.component.create({
        data: {
          boxId: input.boxId,
          componentName: input.componentName,
          xAxis: input.xAxis,
          yAxis: input.yAxis,
        },
      });
    },
  })
  .mutation("deleteComponent", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return ctx.prisma.component.delete({
        where: {
          id: input.id,
        },
      });
    },
  });
