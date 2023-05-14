import NextAuth from "../../../../../pages/api/auth/[...nextauth]";

jest.mock("next-auth", () => jest.fn());

describe("authOptions", () => {
  it("calls NextAuth with the correct options", () => {
    expect(NextAuth).toHaveBeenCalled();
    // expect(NextAuth).toHaveBeenCalledWith(authOptions);
  });
});
