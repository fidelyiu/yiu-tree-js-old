import { TreeBaseOpt } from "../types";
import getTreePropsValue from "./get-tree-props-value";

/**
 * 深克隆
 * @param data 当前克隆的数据
 * @param parentData 父数据
 * @param parentIsArr 父数据是否是数组
 * @param key 当前克隆的数据在父数据中的Key
 * @param allowKeys 允许克隆的Key
 * @param idSet id集合
 * @param isTop 是否是顶层初始克隆
 * @param opt 树解析配置
 */
function _clone(data: any, parentData: any, key: string, allowKeys: string[], idSet: Set<string>, isTop: boolean, parentIsArr: boolean, opt?: TreeBaseOpt): any {
    if (key && !allowKeys.includes(key)) return undefined;
    switch (typeof data) {
        case "string":
        case "symbol":
        case "bigint":
        case "boolean":
        case "number":
        case "undefined":
            return data;
        case "function":
            return undefined;
        case "object": {
            if (Array.isArray(data)) {
                if (parentData) {
                    const children = getTreePropsValue(parentData, "children", opt);
                    if (children !== data) return undefined;
                }
                if (parentIsArr) return undefined;
                const result: any[] = [];
                data.forEach((item) => {
                    result.push(_clone(item, undefined, "", allowKeys, idSet, false, true, opt));
                });
                return result.filter((item) => typeof item !== "undefined");
            } else {
                const id = getTreePropsValue(data, "id", opt);
                if (!id) return undefined;
                if (isTop || parentIsArr) {
                    if (parentIsArr && idSet.has(id)) return undefined;
                    idSet.add(id);
                    const result: any = {};
                    for (const dataKey in data) {
                        if (!Object.prototype.hasOwnProperty.call(data, dataKey)) continue;
                        if (!allowKeys.includes(dataKey)) continue;
                        result[dataKey] = _clone(data[dataKey], data, dataKey, allowKeys, idSet, false, false, opt);
                    }
                    return result;
                }
                return undefined;
            }
        }
    }
}

/**
 * 一个简单的深拷贝方法
 * 只会拷贝简单类型key
 * @param allowKeys 允许拷贝的key
 * @param opt 树解析配置
 * @returns 拷贝方法
 */
export default function deepCloneSimple(allowKeys: string[] = ["id", "pid", "children"], opt?: TreeBaseOpt): Function {
    if (!Array.isArray(allowKeys) || !allowKeys.length) throw new Error("The allowKeys parameter of YiuTree's clone method needs to be passed into an array");
    return function (data: any): any {
        const idSet = new Set<string>();
        return _clone(data, undefined, "", allowKeys, idSet, true, false, opt);
    };
}
