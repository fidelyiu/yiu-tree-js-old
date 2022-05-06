import { TreeBaseOpt } from "../types";

export default function getDeepTree(treeData: Array<any>, opt?: TreeBaseOpt, defDeepClone?: boolean): Array<any> {
    if (typeof treeData === "undefined") return [];
    if (!opt) opt = {};
    let deepClone = !!defDeepClone;
    if (typeof opt.deepClone === "boolean") deepClone = opt.deepClone;
    if (!deepClone) return treeData;
    if (typeof opt.deepCloneFunc !== "function") {
        return JSON.parse(JSON.stringify(treeData)) as Array<any>;
    }
    return opt.deepCloneFunc(treeData) as Array<any>;
}
