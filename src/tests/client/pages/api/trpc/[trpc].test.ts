// import { createNextApiHandler } from "@trpc/server/adapters/next";
// import { appRouter } from "../../../../../server/router";
// import { createContext } from "../../../../../server/router/context";
// import { createTRPCClient } from "@trpc/client";
// import { httpLink } from "@trpc/client/links/httpLink";

// const apiHandler = createNextApiHandler({
//   router: appRouter,
//   createContext,
// });

// describe("TRPC API Handler", () => {
//   test("returns 200 status code for a valid request", async () => {
//     const url = "http://localhost:3000/api/trpc";
//     const trpcClient = createTRPCClient({
//       links: [httpLink({ url })],
//     });

//     const response = await trpcClient.query("ping");

//     expect(response).toEqual("pong");
//   });
// });