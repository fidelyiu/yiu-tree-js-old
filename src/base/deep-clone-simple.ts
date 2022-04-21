import { TreeBaseOpt } from "../types";
import getTreePropsValue from "./get-tree-props-value";

function _clone(data: any, currentKey: string, keys: string[], idSet: Set<string>, isFirst: boolean, parentIsArr: boolean, opt?: TreeBaseOpt): any {
    if (currentKey && !keys.includes(currentKey)) return undefined;
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
                if (!opt || opt.keyMode === "def") {
                    if (currentKey && currentKey !== "children") return undefined;
                } else if (opt.keyMode === "key") {
                    if (currentKey && currentKey !== opt.childrenProp) return undefined;
                }
                const result: any[] = [];
                data.forEach((item) => {
                    result.push(_clone(item, "", keys, idSet, false, true, opt));
                });
                return result;
            } else {
                const id = getTreePropsValue(data, "id", opt);
                if (!id) return undefined;
                if (isFirst || parentIsArr) {
                    if (parentIsArr && idSet.has(id)) return undefined;
                    idSet.add(id);
                    const result: any = {};
                    for (const dataKey in data) {
                        if (Object.prototype.hasOwnProperty.call(data, dataKey)) {
                            if (keys.includes(dataKey)) {
                                result[dataKey] = _clone(data[dataKey], dataKey, keys, idSet, false, false, opt);
                            }
                        }
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
 * @param keys 允许拷贝的key
 * @param opt 树解析配置
 * @returns 拷贝方法
 */
export default function deepCloneSimple(keys: string[] = ["id", "pid", "children"], opt?: TreeBaseOpt): Function {
    if (!Array.isArray(keys) || !keys.length) throw new Error("The keys parameter of YiuTree's clone method needs to be passed into an array");
    if (opt && opt.keyMode !== "def" && opt.keyMode !== "key") throw new Error("YiuTree's clone method only allows 'def' and 'key' modes.");
    return function (data: any): any {
        const idSet = new Set<string>();
        return _clone(data, "", keys, idSet, true, false, opt);
    };
}
