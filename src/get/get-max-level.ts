import getTreePropsValue from "../base/get-tree-props-value";

import type { TreeBaseOpt } from "../types";

function _getMaxLevel(treeData: Array<any>, currentLevel: number, opt?: TreeBaseOpt): number {
    let result = currentLevel;
    if (!Array.isArray(treeData) || !treeData.length) return currentLevel;
    result += 1;
    let tempChildrenResult = 0;
    treeData.forEach((item) => {
        const children = getTreePropsValue(item, "children", opt);
        if (children.length) {
            const childrenResult = _getMaxLevel(item.children, result, opt);
            if (childrenResult > tempChildrenResult) {
                tempChildrenResult = childrenResult;
            }
        }
    });
    if (tempChildrenResult) {
        result = tempChildrenResult;
    }
    return result;
}

/**
 * 获取树最大层级
 * @param treeData 树数据
 * @param opt 节点解析配置
 * @returns 层级
 */
export default function getMaxLevel(treeData: Array<any>, opt?: TreeBaseOpt): number {
    return _getMaxLevel(treeData, 0, opt);
}
