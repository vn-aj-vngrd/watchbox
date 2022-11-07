import { z } from "zod";
import { createProtectedRouter } from "./protected-router";

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
          entries: true,
        },
        orderBy: {
          created_at:
            input.sortParam === "Newest"
              ? "desc"
              : input.sortParam === "Oldest"
              ? "asc"
              : undefined,
          boxTitle:
            input.sortParam === "Z-A" ? "desc" : input.sortParam === "A-Z" ? "asc" : undefined,
        },
      });
    },
  })
  .query("getBox", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return ctx.prisma.user.findFirst({
        where: {
          boxes: {
            some: {
              id: input.id,
            },
          },
        },
        select: {
          id: true,
          username: true,
          boxes: {
            select: {
              id: true,
              boxTitle: true,
              created_at: true,
              updated_at: true,
            },
          },
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
  })
  .mutation("updateBox", {
    input: z.object({
      id: z.string(),
      boxTitle: z.string(),
    }),
    async resolve({ input, ctx }) {
      return ctx.prisma.box.update({
        where: {
          id: input.id,
        },
        data: {
          boxTitle: input.boxTitle,
        },
      });
    },
  })
  .mutation("deleteBox", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return ctx.prisma.box.delete({
        where: {
          id: input.id,
        },
      });
    },
  });
