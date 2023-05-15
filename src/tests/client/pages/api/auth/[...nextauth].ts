import NextAuth from 'next-auth';
import { authOptions } from "../../../../../pages/api/auth/[...nextauth]";

jest.mock('next-auth', () => jest.fn());

describe('auth options configuration', () => {
  it('should call NextAuth with the correct options', () => {
    expect(NextAuth).toHaveBeenCalledWith(authOptions);
  });
});