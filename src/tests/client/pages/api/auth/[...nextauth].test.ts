import { authOptions } from "../../../../../pages/api/auth/[...nextauth]";

jest.mock("next-auth", () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

jest.mock("next-auth/providers/email", () => {
  return jest.fn();
});

jest.mock("next-auth/providers/google", () => {
  return jest.fn();
});

jest.mock("next-auth/providers/twitter", () => {
  return jest.fn();
});

jest.mock("next-auth/providers/discord", () => {
  return jest.fn();
});

describe("Auth", () => {
  it("exports authOptions object with expected properties and values", () => {
    expect(authOptions).toBeDefined();
    expect(authOptions?.pages?.signIn).toBe("/auth/signin");
    expect(authOptions?.pages?.error).toBe("/auth/error");
    expect(authOptions?.pages?.verifyRequest).toBe("/auth/verifyrequest");
    expect(authOptions?.pages?.newUser).toBe("/auth/newuser/");
    expect(authOptions.adapter).toBeDefined();
    expect(authOptions.providers).toHaveLength(4);
  });
});
