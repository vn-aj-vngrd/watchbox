// export default {
//   clearMocks: true,
//   coverageProvider: "v8",
//   preset: "ts-jest/presets/js-with-ts",
//   setupFiles: ["dotenv/config"],
//   transform: {
//     "^.+\\.mjs$": "ts-jest",
//   },
// };

import nextJest from "next/jest";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const customJestConfig = {
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    "^@/(.*)$": "<rootDir>/src/$1",

    "^@/public/(.*)$": "<rootDir>/public/$1",
  },
  // setupFilesAfterEnv: ['./jest.setup.js'],
  clearMocks: true,
  coverageProvider: "v8",
  collectCoverage: true,
  preset: "ts-jest/presets/js-with-ts",
  collectCoverageFrom: [
    "./src/tests/server/**/*.{js,jsx,ts,tsx}",
    "!./src/tests/server/**/_*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 30,
      lines: 30,
      statements: 30,
    },
  },
  // testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  transform: {
    "^.+\\.mjs$": "ts-jest",
  },
  testMatch: ["<rootDir>/src/tests/server/**/*.test.ts"],
};

module.exports = createJestConfig(customJestConfig);
