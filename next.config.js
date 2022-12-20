// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

// next-remove-imports
const removeImports = require("next-remove-imports")({
  test: /node_modules([\s\S]*?)\.(tsx|ts|js|mjs|jsx)$/,
  matchImports: "\\.(less|css|scss|sass|styl)$",
});

module.exports = removeImports(
  withPWA({
    // next.js config
    reactStrictMode: true,
    swcMinify: true,
    experimental: { esmExternals: true },
    images: {
      domains: [
        "encrypted-tbn1.gstatic.com",
        "encrypted-tbn2.gstatic.com",
        "encrypted-tbn3.gstatic.com",
        "res.cloudinary.com",
        "lh3.googleusercontent.com",
        "pbs.twimg.com",
        "cdn.discordapp.com",
        "www.themoviedb.org",
      ],
    },
  }),
);
