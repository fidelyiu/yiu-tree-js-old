import getDeepTree from "../base/get-deep-tree";
import getTreePropsValue from "../base/get-tree-props-value";
import setTreePropsValue from "../base/set-tree-props-value";

import type { TreeBaseOpt, TreeOperationFunc, TreeSearchFunc } from "../types";

function _opBySearch(
    treeData: Array<any>,
    opFunc: TreeOperationFunc,
    scFunc: TreeSearchFunc,
    currentLevel: number,
    parent: any,
    nodePath: Array<any>,
    opt?: TreeBaseOpt
): Array<any> {
    const treeDataLen = treeData.length;
    for (let index = 0; index < treeDataLen; index++) {
        const item = treeData[index];
        const currentPath = nodePath.slice();
        currentPath.push(item);
        const children = getTreePropsValue(item, "children", opt);
        if (Array.isArray(children) && children.length > 0) {
            setTreePropsValue(item, "children", _opBySearch(children, opFunc, scFunc, currentLevel + 1, item, currentPath, opt), opt);
        }
        if (
            scFunc(item, {
                level: currentLevel + 1,
                index,
                isLeaf: !children.length,
                isFirst: index === 0,
                isLast: index === treeData.length - 1,
                parent,
                path: currentPath,
                parentPath: nodePath,
            })
        ) {
            // 符合要求的item
            opFunc(item, {
                level: currentLevel + 1,
                index,
                isLeaf: !children.length,
                isFirst: index === 0,
                isLast: index === treeData.length - 1,
                parent,
                path: currentPath,
                parentPath: nodePath,
            });
        }
    }
    return treeData;
}

/**
 * 操作所有符合查询条件的节点
 * @param treeData 树
 * @param opFunc 操作函数
 * @param scFunc 过滤函数，必须返回boolen（不要修改节点）
 * @param opt 树解析配置
 * @returns
 */
export default function opBySearch(treeData: Array<any>, opFunc: TreeOperationFunc, scFunc: TreeSearchFunc, opt?: TreeBaseOpt): Array<any> {
    if (typeof scFunc !== "function" || typeof opFunc !== "function") return treeData;
    const deepData = getDeepTree(treeData, opt, true);
    if (!Array.isArray(deepData)) return treeData;
    return _opBySearch(deepData, opFunc, scFunc, 0, undefined, [], opt);
}
