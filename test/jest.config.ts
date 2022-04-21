import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    preset: "ts-jest/presets/default-esm",
    rootDir: "..",
    testEnvironment: "node",
    coverageDirectory: "coverage",
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.ts", "src/*.ts", "!**/node_modules/**"],
    globals: {
        "ts-jest": {
            isolatedModules: true,
            useESM: true,
        },
    },
    resetMocks: true,
    clearMocks: true,
};

export default config;
