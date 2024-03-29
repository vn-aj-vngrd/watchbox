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
          components: {
            include: {
              text: true,
              entry: true,
              divider: true,
            },
          },
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
          // id: ctx.session.user.id,
          boxes: {
            some: {
              id: input.id,
            },
          },
        },
        include: {
          boxes: {
            where: {
              id: input.id,
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
  .mutation("getGlobalBoxes", {
    input: z.object({
      searchInput: z.string().nullish(),
      take: z.number(),
    }),
    async resolve({ input, ctx }) {
      if (input.searchInput !== "") {
        return ctx.prisma.box.findMany({
          take: input.take,
          where: {
            boxTitle: {
              contains: input.searchInput || "",
              mode: "insensitive",
            },
            isPublic: true,
          },
          include: {
            components: {
              include: {
                entry: true,
              },
            },
          },
        });
      }

      return;
    },
  })
  .mutation("getGlobalBoxesCount", {
    input: z.object({
      searchInput: z.string().nullish(),
    }),
    async resolve({ input, ctx }) {
      return ctx.prisma.box.count({
        where: {
          boxTitle: {
            contains: input.searchInput || undefined,
            mode: "insensitive",
          },
          isPublic: true,
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
      isPublic: z.boolean(),
    }),
    async resolve({ input, ctx }) {
      return ctx.prisma.box.update({
        where: {
          id: input.id,
        },
        data: {
          boxTitle: input.boxTitle,
          isPublic: input.isPublic,
          updated_at: new Date(),
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
