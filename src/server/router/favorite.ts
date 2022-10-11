import { createProtectedRouter } from "./protected-router";
import { z } from "zod";
import { Box } from "@prisma/client";

export const favoriteRouter = createProtectedRouter()
  .query("getFavorites", {
    input: z.object({
      skip: z.number(),
      take: z.number(),
      searchParam: z.string().nullish(),
      sortParam: z.string(),
    }),
    async resolve({ input, ctx }) {
      const userId = ctx.session.user.id;

      switch (input.sortParam) {
        case "Newest":
          return ctx.prisma.$queryRaw<Box[]>`SELECT *
              FROM "public"."FavoriteBox" 
              LEFT JOIN "public"."Box" ON "public"."Box"."id" = "public"."FavoriteBox"."boxId"
              LEFT JOIN "public"."Entry" on "public"."Entry"."boxId" = "public"."Box"."id"
              WHERE "public"."FavoriteBox"."userId" = ${userId}
              ORDER BY "public"."FavoriteBox"."created_at" desc
              LIMIT ${input.take} OFFSET ${input.skip}`;

        case "Oldest":
          return ctx.prisma.$queryRaw<Box[]>`SELECT *
              FROM "public"."FavoriteBox" 
              LEFT JOIN "public"."Box" ON "public"."Box"."id" = "public"."FavoriteBox"."boxId"
              LEFT JOIN "public"."Entry" on "public"."Entry"."boxId" = "public"."Box"."id"
              WHERE "public"."FavoriteBox"."userId" = ${userId}
              ORDER BY "public"."FavoriteBox"."created_at" asc
              LIMIT ${input.take} OFFSET ${input.skip}`;

        case "A-Z":
          return ctx.prisma.$queryRaw<Box[]>`SELECT *
              FROM "public"."FavoriteBox" 
              LEFT JOIN "public"."Box" ON "public"."Box"."id" = "public"."FavoriteBox"."boxId"
              LEFT JOIN "public"."Entry" on "public"."Entry"."boxId" = "public"."Box"."id"
              WHERE "public"."FavoriteBox"."userId" = ${userId}
              ORDER BY "public"."Box"."boxTitle" asc
              LIMIT ${input.take} OFFSET ${input.skip}`;

        case "Z-A":
          return ctx.prisma.$queryRaw<Box[]>`SELECT *
              FROM "public"."FavoriteBox" 
              LEFT JOIN "public"."Box" ON "public"."Box"."id" = "public"."FavoriteBox"."boxId"
              LEFT JOIN "public"."Entry" on "public"."Entry"."boxId" = "public"."Box"."id"
              WHERE "public"."FavoriteBox"."userId" = ${userId}
              ORDER BY "public"."Box"."boxTitle" desc
              LIMIT ${input.take} OFFSET ${input.skip}`;

        default:
          return;
      }
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
