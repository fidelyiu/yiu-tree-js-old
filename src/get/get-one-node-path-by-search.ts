import getDeepTree from "../base/get-deep-tree";
import getTreePropsValue from "../base/get-tree-props-value";

import type { TreeBaseOpt, TreeSearchFunc } from "../types";

function _getOneNodePathBySearch(treeData: Array<any>, scFunc: TreeSearchFunc, currentLevel: number, parent: any, nodePath: Array<any>, opt?: TreeBaseOpt): Array<any> | [] {
    const treeDataLen = treeData.length;
    for (let index = 0; index < treeDataLen; index++) {
        const item = treeData[index];
        const currentPath = nodePath.slice();
        currentPath.push(item);
        const children = getTreePropsValue(item, "children", opt);
        if (
            scFunc(item, {
                level: currentLevel + 1,
                index,
                isLeaf: !children.length,
                isFirst: index === 0,
                isLast: index === treeData.length - 1,
                parent,
                path: currentPath,
            })
        ) {
            return [item];
        }
        if (Array.isArray(children) && children.length) {
            const childrenResult = _getOneNodePathBySearch(children, scFunc, currentLevel + 1, item, currentPath, opt);
            if (childrenResult && childrenResult.length) {
                return [item, ...childrenResult];
            }
        }
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
    return _getOneNodePathBySearch(deepData, scFunc, 0, undefined, [], opt);
}
