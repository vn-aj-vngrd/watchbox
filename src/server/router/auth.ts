import { createProtectedRouter } from "./protected-router";
import { z } from "zod";

export const authRouter = createProtectedRouter().mutation("getStarted", {
  async resolve({ ctx }) {
    return ctx.prisma.user.update({
      where: {
        id: ctx.session.user.id,
      },
      data: {
        isNewUser: false,
      },
    });
  },
});
