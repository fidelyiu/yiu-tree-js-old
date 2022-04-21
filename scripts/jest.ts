import { spawn } from "node:child_process";

function bootstrap() {
    spawn(
        "node",
        [
            "--experimental-vm-modules",
            "--no-warnings",
            "node_modules/jest/bin/jest.js",
            "-c=./test/jest.config.ts",
            "--no-cache",
            "--coverage",
            // https://stackoverflow.com/questions/45087018/jest-simple-tests-are-slow
            "--maxWorkers=1",
        ],
        { stdio: "inherit" }
    );
}

bootstrap();
