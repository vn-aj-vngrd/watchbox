import { createProtectedRouter } from "./protected-router";
import { z } from "zod";

export const favoriteRouter = createProtectedRouter()
  .query("getFavorites", {
    input: z.object({
      skip: z.number(),
      take: z.number(),
      searchParam: z.string().nullish(),
      sortParam: z.string(),
    }),
    async resolve({ input, ctx }) {
      return ctx.prisma.box.findMany({
        take: input.take,
        skip: input.skip,
        where: {
          FavoriteBox: {
            some: {
              userId: ctx.session.user.id,
            },
          },
        },
        include: {
          Entry: true,
          FavoriteBox: true,
        },
        orderBy: {
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
  .query("getFavoritesCount", {
    async resolve({ ctx }) {
      return ctx.prisma.favoriteBox.count({
        where: {
          userId: ctx.session.user.id,
        },
      });
    },
  });
