import treeOpBySearch from "../op/op-by-search";
import getTreePropsValue from "../base/get-tree-props-value";
import setTreePropsValue from "../base/set-tree-props-value";

import type { TreeBaseOpt } from "../types";
import getDeepTree from "../base/get-deep-tree";

/**
 * 根据List生成Tree
 * @param list 数组
 * @param opt 节点解析配置
 * @returns
 */
export default function getTreeByList(list: Array<any>, opt?: TreeBaseOpt) {
    const deepData = getDeepTree(list, opt, true);
    if (!Array.isArray(deepData) || !deepData.length) return [];
    let result: Array<any> = [];
    deepData.forEach((item) => {
        result = mergeNodeToTree(result, item, opt);
    });
    return result;
}

function mergeNodeToTree(tree: Array<any>, node: any, opt?: TreeBaseOpt): Array<any> {
    if (!Array.isArray(tree)) return [];
    const id = getTreePropsValue(node, "id", opt);
    if (!id) return [];
    const pid = getTreePropsValue(node, "pid", opt);
    if (!pid) {
        return mergeTreeToNode(tree, node, opt);
    }
    let hasMerge = false;
    const result = treeOpBySearch(
        tree,
        (item) => {
            if (hasMerge) return;
            hasMerge = true;
            const children = getTreePropsValue(item, "children", opt);
            if (!children.map((child: any) => getTreePropsValue(child, "id", opt)).includes(id)) {
                children.push(node);
            }
            setTreePropsValue(item, "children", children, opt);
        },
        (item) => getTreePropsValue(item, "id", opt) === pid,
        opt
    );
    if (hasMerge) return result;
    return mergeTreeToNode(tree, node);
}

function mergeTreeToNode(tree: Array<any>, node: any, opt?: TreeBaseOpt): Array<any> {
    const id = getTreePropsValue(node, "id", opt);
    const children = getTreePropsValue(node, "children", opt);
    if (!id) return [];
    if (!Array.isArray(tree)) return [];
    const reuslt = [];
    tree.forEach((item) => {
        const cid = getTreePropsValue(item, "id", opt);
        if (!cid) return;
        const pid = getTreePropsValue(item, "pid", opt);
        if (pid === id) {
            if (!children.map((child: any) => getTreePropsValue(child, "id", opt)).includes(cid)) {
                children.push(item);
            }
        } else {
            reuslt.push(item);
        }
    });
    setTreePropsValue(node, "children", children, opt);
    reuslt.push(node);
    return reuslt;
}
