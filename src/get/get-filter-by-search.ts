import getTreePropsValue from "../base/get-tree-props-value";
import setTreePropsValue from "../base/set-tree-props-value";

import type { TreeFilterOption, TreeSearchFunc } from "../types";

function _getFilterBySearch(treeData: Array<any>, scFunc: TreeSearchFunc, currentLevel: number, opt: TreeFilterOption): Array<any> {
    const result: Array<any> = [];
    if (!opt) opt = {};
    const parentMatch = !!opt.parentMatch;
    const childrenMatch = !!opt.childrenMatch;
    let deepClone = opt.deepCloneFunc;
    if (!deepClone || typeof deepClone !== "function") {
        deepClone = (data: any) => JSON.parse(JSON.stringify(data));
    }
    if (typeof scFunc !== "function" || !treeData || !treeData.length) {
        return result;
    }
    const cloneTreeData = <Array<any>>deepClone(treeData);
    if (parentMatch) {
        // 父节点必须匹配
        let index = 0;
        for (const treeNode of cloneTreeData) {
            // 当前节点是否匹配
            const currentMatch = !!scFunc(treeNode, currentLevel + 1, index);
            if (!currentMatch) {
                // 不匹配直接跳过
                continue;
            }
            // 处理子节点
            const children = getTreePropsValue(treeNode, "children", opt);
            if (Array.isArray(children) && children.length) {
                if (childrenMatch) {
                    setTreePropsValue(treeNode, "children", _getFilterBySearch(children, scFunc, currentLevel + 1, opt), opt);
                }
            } else {
                setTreePropsValue(treeNode, "children", [], opt);
            }
            result.push(treeNode);
            index += 1;
        }
    } else {
        // 父节点不需要匹配
        // 此时需要考虑，子节点是否匹配
        let index = 0;
        for (const treeNode of cloneTreeData) {
            const children = getTreePropsValue(treeNode, "children", opt);
            // 当前节点是否匹配
            const currentMatch = !!scFunc(treeNode, currentLevel + 1, index);
            if (currentMatch) {
                // 如果当前节点匹配了，就直接处理子节点
                if (childrenMatch) {
                    setTreePropsValue(treeNode, "children", _getFilterBySearch(children, scFunc, currentLevel + 1, opt), opt);
                }
                result.push(treeNode);
            } else {
                // 当前节点不匹配
                if (Array.isArray(children) && children.length) {
                    // 将节点按照当前查询条件再过滤一遍
                    setTreePropsValue(treeNode, "children", _getFilterBySearch(children, scFunc, currentLevel + 1, opt), opt);
                    // 如果此时还存在子节点就输出
                    if (Array.isArray(children) && children.length) {
                        result.push(treeNode);
                    }
                }
            }
            index += 1;
        }
    }
    return result;
}

/**
 * 过滤一个树，生成一个新的树
 * @param treeData 树数据
 * @param scFunc 过滤函数（结果true则保留输出）
 * @param opt 过滤配置 & 树解析配置
 * @returns 新的树数据
 */
export default function getFilterBySearch(treeData: Array<any>, scFunc: TreeSearchFunc, opt: TreeFilterOption): Array<any> {
    return _getFilterBySearch(treeData, scFunc, 0, opt);
}
