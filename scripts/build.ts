import { spawnSync, execSync } from "node:child_process";
import { cpSync, rmSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";

function bootstrap() {
    // 拷贝ts源码
    console.log("拷贝ts源码!");
    cpSync("./src/", "./dist/ts/", { recursive: true });

    // 重写dist中type配置
    console.log("重写dist中ts配置!");
    const typeConfigFile = "./dist/ts/tsconfig.type.json";
    const typeConfigFileOldContent = readFileSync(typeConfigFile, { encoding: "utf8" });
    writeFileSync(
        typeConfigFile,
        typeConfigFileOldContent.replace(/: "..\/dist/g, ': "..').replace(/"extends": "..\/tsconfig.base.json",/, '"extends": "../../tsconfig.base.json",'),
        { encoding: "utf8" }
    );

    console.log("编译@types!");
    execSync("tsc -p ./dist/ts/tsconfig.type.json", { stdio: "inherit" });

    console.log("删除type.ts配置!");
    rmSync("./dist/ts/tsconfig.type.json");

    // 重写dist中type配置
    console.log("重写dist中ts配置!");
    const tsConfigFile = "./dist/ts/tsconfig.json";
    const tsConfigFileOldContent = readFileSync(tsConfigFile, { encoding: "utf8" });
    writeFileSync(tsConfigFile, tsConfigFileOldContent.replace(/"extends": "..\/tsconfig.base.json",/, '"extends": "../../tsconfig.base.json",'), { encoding: "utf8" });

    console.log("编译rollup!");
    spawnSync(
        "node",
        [
            "--experimental-vm-modules",
            "--no-warnings",
            "node_modules/rollup/dist/bin/rollup",
            "--config=./rollup/rollup.config.ts",
            // ts
            "--configPlugin=@rollup/plugin-typescript",
        ],
        { stdio: "inherit" }
    );

    // 删除ts配置
    console.log("删除ts配置!");
    rmSync("./dist/ts/tsconfig.json");

    // 拷贝READEME.md
    console.log("拷贝READEME.md!");
    copyFileSync("./README.md", "./dist/README.md");

    // 拷贝package.json
    console.log("拷贝package.json!");
    copyFileSync("./package.json", "./dist/package.json");

    // 修改package.json
    console.log("修改package.json!");
    const packageJsonFile = "./dist/package.json";
    const packageJsonOldContent = readFileSync(packageJsonFile, { encoding: "utf8" });
    writeFileSync(
        packageJsonFile,
        packageJsonOldContent
            .replace(/\s*"scripts": {/g, "")
            .replace(/\s*"test": "ts-node .\/scripts\/jest.ts",/g, "")
            .replace(/\s*"build": "ts-node .\/scripts\/build.ts",/g, "")
            .replace(/\s*"clear:node_modules": "rimraf node_modules"\s*},/g, "")
            .replace(/\.\/dist/g, "."),
        { encoding: "utf8" }
    );

    // 拷贝npm忽略文件
    console.log("修改.npmignore!");
    copyFileSync("./.npmignore", "./dist/.npmignore");
}

bootstrap();
