// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { userRouter } from "./user";
import { boxRouter } from "./box";
import { favoriteRouter } from "./favorite";
import { entryRouter } from "./entry";
import { componentRouter } from "./component";
import { textRouter } from "./text";
import { dividerRouter } from "./divider";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("user.", userRouter)
  .merge("box.", boxRouter)
  .merge("favorite.", favoriteRouter)
  .merge("entry.", entryRouter)
  .merge("component.", componentRouter)
  .merge("text.", textRouter)
  .merge("divider.", dividerRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
