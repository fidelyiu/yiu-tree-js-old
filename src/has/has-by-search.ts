import getDeepTree from "../base/get-deep-tree";
import getTreePropsValue from "../base/get-tree-props-value";

import type { TreeBaseOpt, TreeSearchFunc } from "../types";

function _hasBySearch(treeData: Array<any>, scFunc: TreeSearchFunc, currentLevel: number, parent: any, nodePath: Array<any>, opt?: TreeBaseOpt): boolean {
    const treeDataLen = treeData.length;
    for (let index = 0; index < treeDataLen; index++) {
        const item = treeData[index];
        const currentNodePath = nodePath.slice();
        currentNodePath.push(item);
        const children = getTreePropsValue(item, "children", opt);
        if (
            scFunc(item, {
                level: currentLevel + 1,
                index,
                isLeaf: !children.length,
                isFirst: index === 0,
                isLast: index === treeData.length - 1,
                parent,
                nodePath: currentNodePath,
            })
        ) {
            return true;
        }
        if (Array.isArray(children) && children.length && _hasBySearch(children, scFunc, currentLevel + 1, item, currentNodePath, opt)) {
            return true;
        }
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
    return _hasBySearch(deepData, scFunc, 0, undefined, [], opt);
}
