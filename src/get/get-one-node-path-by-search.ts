import getDeepTree from "../base/get-deep-tree";
import getTreePropsValue from "../base/get-tree-props-value";

import type { TreeBaseOpt, TreeSearchFunc } from "../types";

function _getOneNodePathBySearch(treeData: Array<any>, scFunc: TreeSearchFunc, currentLevel: number, opt?: TreeBaseOpt): Array<any> | [] {
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
            return [treeNode];
        }
        if (Array.isArray(children) && children.length) {
            const childrenResult = _getOneNodePathBySearch(children, scFunc, currentLevel + 1, opt);
            if (childrenResult && childrenResult.length) {
                return [treeNode, ...childrenResult];
            }
        }
        index += 1;
    }
    return [];
}

/**
 * 获取一个节点元素的元素路径
 * @param treeData 树
 * @param scFunc 过滤条件，返回true则立即返回该节点（不要修改节点）
 * @param opt 解析节点配置
 * @returns 找到的节点即父节点数组
 */
export default function getOneNodePathBySearch(treeData: Array<any>, scFunc: TreeSearchFunc, opt?: TreeBaseOpt): Array<any> | [] {
    if (typeof scFunc !== "function") return [];
    const deepData = getDeepTree(treeData, opt, true);
    if (!Array.isArray(deepData) || !deepData.length) return [];
    return _getOneNodePathBySearch(deepData, scFunc, 0, opt);
}
