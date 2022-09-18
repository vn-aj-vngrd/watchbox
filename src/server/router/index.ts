// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { authRouter } from "./auth";
import { userRouter } from "./user";
import { boxRouter } from "./box";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("auth.", authRouter)
  .merge("user.", userRouter)
  .merge("box.", boxRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
