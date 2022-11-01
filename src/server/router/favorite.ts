import { z } from "zod";
import { createProtectedRouter } from "./protected-router";

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
          boxTitle: {
            contains: input.searchParam || undefined,
            mode: "insensitive",
          },
        },
        include: {
          Entry: true,
          FavoriteBox: true,
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
  .query("getFavoritesCount", {
    async resolve({ ctx }) {
      return ctx.prisma.favoriteBox.count({
        where: {
          userId: ctx.session.user.id,
        },
      });
    },
  });
