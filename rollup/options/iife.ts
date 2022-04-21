import typescript from "../plugins/typescript";
import { terser } from "rollup-plugin-terser";
import type { RollupOptions } from "rollup";
import type { BuildOption } from "./option-type";

/**
 * 浏览器环境
 * @param minify 是否压缩
 * @returns rollup配置
 */
export function createOptionIife(option: BuildOption): RollupOptions {
    const { fileName, outName, minify = false, external = [], globals } = option;
    return {
        input: "./dist/ts/index.ts",
        plugins: [typescript],
        external,
        output: {
            name: outName,
            file: `dist/iife/${fileName}${external.toString() ? ".ex" : ""}${minify ? ".min" : ""}.js`,
            format: "iife",
            sourcemap: minify,
            sourcemapFile: `dist/iife/${fileName}${external.toString() ? ".ex" : ""}${minify ? ".min" : ""}.js`,
            globals,
            plugins: [minify ? terser() : undefined],
        },
    };
}
