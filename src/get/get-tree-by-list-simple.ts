import getDeepTree from "../base/get-deep-tree";
import getTreePropsValue from "../base/get-tree-props-value";
import setTreePropsValue from "../base/set-tree-props-value";
import type { TreeBaseOpt } from "../types";

/**
 * 快速的获取一个Tree，不会做过多的判断
 */
export default function getTreeByListSimple(list: Array<any>, opt?: TreeBaseOpt): Array<any> {
    const deepData = getDeepTree(list, opt, true);
    const treeMap = new Map();
    for (const node of deepData) {
        const id = getTreePropsValue(node, "id", opt);
        if (!id) continue;
        setTreePropsValue(node, "children", [], opt);
        treeMap.set(id, node);
    }
    for (const node of deepData) {
        const parentId = getTreePropsValue(node, "pid", opt);
        if (!parentId) continue;
        const parent = treeMap.get(parentId);
        if (parent) {
            const children = getTreePropsValue(parent, "children", opt);
            children.push(node);
        }
    }
    return deepData.filter((node) => !getTreePropsValue(node, "pid", opt));
}
