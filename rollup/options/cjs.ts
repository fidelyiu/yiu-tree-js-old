import typescript from "../plugins/typescript";
import { terser } from "rollup-plugin-terser";
import type { RollupOptions } from "rollup";
import type { BuildOption } from "./option-type";

export function createOptionCjs(option: BuildOption): RollupOptions {
    const { fileName, minify = false, external = [], globals } = option;
    return {
        input: "./dist/ts/index.ts",
        plugins: [typescript],
        external,
        output: {
            file: `dist/cjs/${fileName}${minify ? ".min" : ""}.cjs`,
            format: "cjs",
            sourcemap: minify,
            sourcemapFile: `dist/cjs/${fileName}${minify ? ".min" : ""}.map`,
            globals,
            plugins: [minify ? terser() : undefined],
        },
    };
}
