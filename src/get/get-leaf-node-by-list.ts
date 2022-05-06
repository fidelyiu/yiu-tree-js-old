import getDeepTree from "../base/get-deep-tree";
import getTreePropsValue from "../base/get-tree-props-value";
import { TreeBaseOpt } from "../types";

export default function getLeafNodeByList(list: Array<any>, opt?: TreeBaseOpt): Array<any> {
    const deepData = getDeepTree(list, opt, true);
    if (!deepData || !Array.isArray(deepData)) return [];
    const nonleaves = new Set(deepData.map((node) => getTreePropsValue(node, "pid", opt)).filter((pid) => typeof pid !== "undefined"));
    return deepData.filter((node) => !nonleaves.has(getTreePropsValue(node, "id", opt)));
}
