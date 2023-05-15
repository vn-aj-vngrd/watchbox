import nextJest from "next/jest";

const createJestConfig = nextJest({
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
  testMatch: [
    "<rootDir>/src/tests/client/**/*.test.tsx",
    "<rootDir>/src/tests/client/**/*.test.ts",
  ],
  moduleNameMapper: {
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
