import { defineConfig } from "rollup";
import { createOptionCjs } from "./options/cjs";
import { createOptionEsm } from "./options/esm";
import { createOptionIife } from "./options/iife";
import { createOptionUmd } from "./options/umd";

const fileName = "yiu-tree";
const outName = "YiuTree";

export default defineConfig([
    // esm
    createOptionEsm({ fileName }),
    createOptionEsm({ fileName, minify: true }),
    // cjs
    createOptionCjs({ fileName }),
    createOptionCjs({ fileName, minify: true }),
    // iife
    createOptionIife({ fileName, outName }),
    createOptionIife({ fileName, outName, minify: true }),
    // umd
    createOptionUmd({ fileName, outName }),
    createOptionUmd({ fileName, outName, minify: true }),
]);
