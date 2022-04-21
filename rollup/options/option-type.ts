import type { ExternalOption, GlobalsOption } from "rollup";

export type BuildOption = {
    fileName: string;
    minify?: boolean;
    outName?: string;
    external?: ExternalOption;
    globals?: GlobalsOption;
};
