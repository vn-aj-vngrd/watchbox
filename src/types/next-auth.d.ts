import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
    } & { isNewUser: boolean | null | undefined } & {
      username: string | null | undefined;
    } & DefaultSession["user"];
  }
}
