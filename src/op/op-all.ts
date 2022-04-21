import treeOpBySearch from "./op-by-search";

import type { TreeBaseOpt, TreeOperationFunc } from "../types";

/**
 * 操作所有节点
 * @param treeData 树
 * @param opFunc 操作函数
 * @param opt 树解析配置
 * @returns 返回树，直接修改原数据
 */
export default function opAll(treeData: Array<any>, opFunc: TreeOperationFunc, opt?: TreeBaseOpt): Array<any> {
    return treeOpBySearch(treeData, opFunc, () => true, opt);
}
