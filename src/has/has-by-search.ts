import getDeepTree from "../base/get-deep-tree";
import getTreePropsValue from "../base/get-tree-props-value";

import type { TreeBaseOpt, TreeSearchFunc } from "../types";

function _hasBySearch(treeData: Array<any>, scFunc: TreeSearchFunc, currentLevel: number, opt?: TreeBaseOpt): boolean {
    let index = 0;
    for (const treeNode of treeData) {
        const children = getTreePropsValue(treeNode, "children", opt);
        if (
            scFunc(treeNode, {
                level: currentLevel + 1,
                index,
                isLeaf: !children.length,
                isFirst: index === 0,
                isLast: index === treeData.length - 1,
            })
        ) {
            return true;
        }
        if (Array.isArray(children) && children.length && _hasBySearch(children, scFunc, currentLevel + 1, opt)) {
            return true;
        }
        index += 1;
    }
    return false;
}

/**
 * 判断树中是否有符合查询函数的节点
 * @param treeData 树数据
 * @param scFunc 查询函数
 * @param opt 树解析配置
 * @returns
 */
export default function hasBySearch(treeData: Array<any>, scFunc: TreeSearchFunc, opt?: TreeBaseOpt): boolean {
    if (typeof scFunc !== "function") return false;
    const deepData = getDeepTree(treeData, opt, false);
    if (!Array.isArray(deepData) || !deepData.length) return false;
    return _hasBySearch(deepData, scFunc, 0, opt);
}
