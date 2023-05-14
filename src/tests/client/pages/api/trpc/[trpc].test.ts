import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "../../../../../server/router";
import { createContext } from "../../../../../server/router/context";

jest.mock("../../../../../server/router", () => ({
  appRouter: jest.fn(),
}));

jest.mock("../../../../../server/router/context", () => ({
  createContext: jest.fn(),
}));

describe("createNextApiHandler", () => {
  it("should return a function", () => {
    const handler = createNextApiHandler({
      router: appRouter,
      createContext,
    });

    expect(typeof handler).toBe("function");
  });
});
