// src/pages/_app.tsx

import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { withTRPC } from "@trpc/next";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import type { AppType } from "next/dist/shared/lib/utils";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import superjson from "superjson";
import Layout from "../components/Common/Layout";
import type { AppRouter } from "../server/router";
import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <Toaster position="bottom-right" reverseOrder={false} />
        <Layout>
          <>
            <NextNProgress
              color="#3b82f6"
              height={5}
              options={{
                showSpinner: false,
              }}
            />
            <Component {...pageProps} />
          </>
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
};

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({ url }),
      ],
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
