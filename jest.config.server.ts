import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",

    "^@/public/(.*)$": "<rootDir>/public/$1",
  },
  clearMocks: true,
  coverageProvider: "v8",
  collectCoverage: true,
  preset: "ts-jest/presets/js-with-ts",
  collectCoverageFrom: [
    "./src/tests/server/**/*.{js,jsx,ts,tsx}",
    "!./src/tests/server/**/_*.{js,jsx,ts,tsx}",
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
