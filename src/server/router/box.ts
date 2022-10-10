import { createProtectedRouter } from "./protected-router";
import { z } from "zod";

export const boxRouter = createProtectedRouter()
  .query("getBoxes", {
    input: z.object({
      skip: z.number(),
      take: z.number(),
      searchParam: z.string().nullish(),
      sortParam: z.string(),
    }),
    async resolve({ input, ctx }) {
      return ctx.prisma.box.findMany({
        skip: input?.skip,
        take: input?.take,
        where: {
          userId: ctx.session.user.id,
          boxTitle: {
            contains: input.searchParam || undefined,
            mode: "insensitive",
          },
        },
        include: {
          Entry: true,
        },
        orderBy: {
          created_at:
            input.sortParam === "Newest"
              ? "desc"
              : input.sortParam === "Oldest"
              ? "asc"
              : undefined,
          boxTitle:
            input.sortParam === "Z-A"
              ? "desc"
              : input.sortParam === "A-Z"
              ? "asc"
              : undefined,
        },
      });
    },
  })
  .query("getBoxesCount", {
    async resolve({ ctx }) {
      return ctx.prisma.box.count({
        where: {
          userId: ctx.session.user.id,
        },
      });
    },
  })
  .mutation("createBox", {
    input: z.object({
      boxTitle: z.string(),
    }),
    async resolve({ input, ctx }) {
      return ctx.prisma.box.create({
        data: {
          userId: ctx.session.user.id,
          boxTitle: input.boxTitle,
        },
      });
    },
  });
