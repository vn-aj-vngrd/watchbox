// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { userRouter } from "./user";
import { boxRouter } from "./box";
import { favoriteRouter } from "./favorite";
import { entryRouter } from "./entry";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("user.", userRouter)
  .merge("box.", boxRouter)
  .merge("favorite.", favoriteRouter)
  .merge("entry.", entryRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
