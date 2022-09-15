// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { boxRouter } from "./box";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("box.", boxRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
