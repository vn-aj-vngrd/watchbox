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
  // setupFilesAfterEnv: ['./jest.setup.js'],
  clearMocks: true,
  coverageProvider: "v8",
  collectCoverage: true,
  preset: "ts-jest/presets/js-with-ts",
  collectCoverageFrom: [
    "./src/tests/client/**/*.{js,jsx,ts,tsx}",
    "!./src/tests/client/**/_*.{js,jsx,ts,tsx}",
  ],
  // coverageThreshold: {
  //   global: {
  //     branches: 30,
  //     functions: 30,
  //     lines: 30,
  //     statements: 30,
  //   },
  // },
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["dotenv/config"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
  testMatch: ["<rootDir>/src/tests/client/**/*.test.tsx"],
};

module.exports = createJestConfig(customJestConfig);
