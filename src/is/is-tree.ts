import getTreePropsValue from "../base/get-tree-props-value";

import type { TreeBaseOpt } from "../types";

function _isTree(treeData: Array<any>, idSet: Set<string>, opt?: TreeBaseOpt) {
    let result = true;
    if (!Array.isArray(treeData)) return false;
    for (const node of treeData) {
        const id = getTreePropsValue(node, "id", opt);
        if (typeof id === "undefined") return false;
        if (idSet.has(id)) return false;
        idSet.add(id);
        const children = getTreePropsValue(node, "children", opt);
        if (Array.isArray(children)) {
            const childResult = _isTree(children, idSet, opt);
            if (!childResult) {
                result = false;
            }
        }
    }
    return result;
}

/**
 * 判断数据是否是有效的树数据，这样可以避免循环引用的报错
 * @param treeData 数据
 * @param opt 树解析配置
 * @returns true表示有效树、false表示无效
 */
export default function isTree(treeData: Array<any>, opt?: TreeBaseOpt) {
    const idSet = new Set<string>();
    return _isTree(treeData, idSet, opt);
}
