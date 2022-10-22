// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
  // next.js config
  reactStrictMode: true,
  swcMinify: true,
});

module.exports = {
  images: {
    domains: [
      "encrypted-tbn1.gstatic.com",
      "encrypted-tbn2.gstatic.com",
      "encrypted-tbn3.gstatic.com",
    ],
  },
};
