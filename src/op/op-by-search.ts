import getTreePropsValue from "../base/get-tree-props-value";
import setTreePropsValue from "../base/set-tree-props-value";

import type { TreeBaseOpt, TreeOperationFunc, TreeSearchFunc } from "../types";

function _opBySearch(treeData: Array<any>, opFunc: TreeOperationFunc, scFunc: TreeSearchFunc, currentLevel: number, opt?: TreeBaseOpt): Array<any> {
    treeData.forEach((item, index) => {
        const children = getTreePropsValue(item, "children", opt);
        if (Array.isArray(children) && children.length > 0) {
            setTreePropsValue(item, "children", _opBySearch(children, opFunc, scFunc, currentLevel + 1, opt), opt);
        }
        if (scFunc(item, currentLevel + 1, index)) {
            // 符合要求的item
            opFunc(item, currentLevel + 1, index);
        }
    });
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
    if (typeof scFunc !== "function" || typeof opFunc !== "function") {
        return treeData;
    }
    return _opBySearch(treeData.slice(), opFunc, scFunc, 0, opt);
}
