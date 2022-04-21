/**
 * YiuTree操作树的js库
 */
// 所有类型文件
import type * as YiuTreeType from "./types";
export type { YiuTreeType };

// get工具
import getFilterBySearch from "./get/get-filter-by-search";
import getMaxLevel from "./get/get-max-level";
import getOneNodeBySearch from "./get/get-one-node-by-search";
import getOneNodePathBySearch from "./get/get-one-node-path-by-search";
import getTreeByList from "./get/get-tree-by-list";
import getListByTree from "./get/get-list-by-tree";
export { getFilterBySearch, getMaxLevel, getOneNodeBySearch, getOneNodePathBySearch, getTreeByList, getListByTree };

// has工具
import hasBySearch from "./has/has-by-search";
export { hasBySearch };

// op工具
import opAll from "./op/op-all";
import opBySearch from "./op/op-by-search";
export { opAll, opBySearch };

// is工具
import isTree from "./is/is-tree";
export { isTree };

// 简单深拷贝生成方法
import YiuClone from "./base/deep-clone-simple";
export { YiuClone };
