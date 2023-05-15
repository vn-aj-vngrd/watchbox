// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.ts`
import "@testing-library/jest-dom/";
import { TextEncoder, TextDecoder } from "util";
import ResizeObserver from "resize-observer-polyfill";
import "jest-canvas-mock";
import { enableFetchMocks } from "jest-fetch-mock";

Object.assign(global, { TextEncoder, TextDecoder });
window.ResizeObserver = ResizeObserver;
enableFetchMocks();
