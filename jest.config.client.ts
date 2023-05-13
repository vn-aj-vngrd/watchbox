import nextJest from "next/jest";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const customJestConfig = {
  clearMocks: true,
  coverageProvider: "v8",
  collectCoverage: true,
  preset: "ts-jest/presets/js-with-ts",
  collectCoverageFrom: [
    "./src/tests/client/**/*.{js,jsx,ts,tsx}",
    "!./src/tests/client/**/_*.{js,jsx,ts,tsx}",
  ],
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["dotenv/config"],
  automock: false,
  setupFilesAfterEnv: ["./jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["<rootDir>/src/tests/client/**/*.test.tsx"],
  moduleNameMapper: {
    // Force module uuid to resolve with the CJS entry point, because Jest does not support package.json.exports. See https://github.com/uuidjs/uuid/issues/451
    uuid: require.resolve("uuid"),
    jose: require.resolve("jose"),
  },
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
