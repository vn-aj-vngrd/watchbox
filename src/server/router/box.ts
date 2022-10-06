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
      switch (input.sortParam) {
        case "Newest":
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
            orderBy: {
              created_at: "desc",
            },
          });
        case "Oldest":
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
            orderBy: {
              created_at: "asc",
            },
          });
        case "A-Z":
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
            orderBy: {
              boxTitle: "asc",
            },
          });
        case "Z-A":
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
            orderBy: {
              boxTitle: "desc",
            },
          });
        default:
          return ctx.prisma.box.findMany({
            skip: input?.skip,
            take: input?.take,
            where: {
              userId: ctx.session.user.id,
            },
            orderBy: {
              created_at: "desc",
            },
          });
      }
    },
  })
  .query("getPageCount", {
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
