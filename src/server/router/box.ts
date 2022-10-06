import { createProtectedRouter } from "./protected-router";
import { z } from "zod";

export const boxRouter = createProtectedRouter()
  .query("getBoxes", {
    input: z
      .object({
        skip: z.number(),
        take: z.number(),
      })
      .nullish(),
    async resolve({ input, ctx }) {
      return ctx.prisma.box.findMany({
        skip: input?.skip,
        take: input?.take,
        where: {
          userId: ctx.session.user.id,
        },
      });
    },
  })

  .query("getPageCount", {
    async resolve({ctx}) {
      return ctx.prisma.box.count({
        where:{
          userId: ctx.session.user.id,
        },
      })
    },
  })
  // .mutation("createBox", {
  //   input: z.object({
  //     boxTitle: z.string(),
  //     boxLink: z.string(),
  //   }),
  //   async resolve({ input, ctx }) {
  //     return ctx.prisma.box.create({
  //       data: {
  //         userId: ctx.session.user.id,
  //         boxTitle: input.boxTitle,
  //         boxLink: input.boxLink,
  //       },
  //     });
  //   },
  // });
