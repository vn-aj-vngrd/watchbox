import { z } from "zod";
import { createProtectedRouter } from "./protected-router";

export const entryRouter = createProtectedRouter()
  .query("getEntry", {
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
          entry: true,
        },
      });
    },
  })
  .query("getBoxTitle", {
    input: z.object({
      id: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      return ctx.prisma.box.findFirst({
        where: {
          id: input.id,
        },
        select: {
          boxTitle: true,
        },
      });
    },
  })
  .mutation("createEntry", {
    input: z.object({
      componentId: z.string(),
      movieId: z.string(),
      title: z.string(),
      image: z.string(),
    }),
    async resolve({ input, ctx }) {
      return ctx.prisma.entry.create({
        data: {
          componentId: input.componentId,
          movieId: input.movieId,
          title: input.title,
          image: input.image,
        },
      });
    },
  })
  .mutation("updateStatus", {
    input: z.object({
      id: z.string(),
      status: z.number(),
    }),
    resolve: async ({ input, ctx }) => {
      return ctx.prisma.entry.update({
        where: { id: input.id },
        data: { status: input.status },
      });
    },
  })
  .mutation("updateReview", {
    input: z.object({
      id: z.string(),
      review: z.string().nullable(),
    }),
    resolve: async ({ input, ctx }) => {
      return ctx.prisma.entry.update({
        where: { id: input.id },
        data: { review: input.review },
      });
    },
  })
  .mutation("updateNote", {
    input: z.object({
      id: z.string(),
      note: z.string().nullable(),
    }),
    resolve: async ({ input, ctx }) => {
      return ctx.prisma.entry.update({
        where: { id: input.id },
        data: { note: input.note },
      });
    },
  })
  .mutation("updateRating", {
    input: z.object({
      id: z.string(),
      rating: z.number(),
    }),
    resolve: async ({ input, ctx }) => {
      return ctx.prisma.entry.update({
        where: { id: input.id },
        data: { rating: input.rating },
      });
    },
  });
