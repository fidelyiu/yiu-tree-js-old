import { TreeBaseOpt, TreeKeyType } from "../types";
import { worringKeyShouldBe, worringOptFuncShouldBe, worringOptNotFunc, worrinPropNotFind } from "./worn-func";

export default function getTreePropsValue(treeNode: any, key: TreeKeyType, opt?: TreeBaseOpt): any {
    let result: any;
    if (!treeNode) return undefined;
    const baseOpt: TreeBaseOpt = Object.assign({}, opt);

    switch (key) {
        case "id": {
            if (typeof baseOpt.idGetter === "undefined") {
                const idProp = baseOpt.idProp || "id";
                result = treeNode[idProp];
                if (typeof result === "undefined") {
                    baseOpt.worn && worrinPropNotFind(idProp, treeNode);
                }
            } else if (typeof baseOpt.idGetter === "function") {
                const value = baseOpt.idGetter(treeNode);
                if (typeof value === "string") {
                    result = value;
                } else {
                    baseOpt.worn && worringOptFuncShouldBe("idGetter", "string", value, treeNode);
                }
            } else {
                baseOpt.worn && worringOptNotFunc("idGetter", baseOpt.idGetter, baseOpt);
            }
            break;
        }
        case "pid": {
            if (typeof baseOpt.pidGetter === "undefined") {
                const pidProp = baseOpt.pidProp || "pid";
                result = treeNode[pidProp];
                if (typeof result === "undefined") {
                    baseOpt.worn && worrinPropNotFind(pidProp, treeNode);
                }
            } else if (typeof baseOpt.pidGetter === "function") {
                const value = baseOpt.pidGetter(treeNode);
                if (typeof value === "string") {
                    result = value;
                } else {
                    baseOpt.worn && worringOptFuncShouldBe("pidGetter", "string", value, treeNode);
                }
            } else {
                baseOpt.worn && worringOptNotFunc("pidGetter", baseOpt.pidGetter, baseOpt);
            }
            break;
        }
        case "children": {
            if (typeof baseOpt.childrenGetter === "undefined") {
                const childrenProp = baseOpt.childrenProp || "children";
                if (typeof treeNode[childrenProp] === "undefined") {
                    result = [];
                } else if (Array.isArray(treeNode[childrenProp])) {
                    result = treeNode[childrenProp];
                } else {
                    result = [];
                    baseOpt.worn && worringKeyShouldBe(childrenProp, "Array", treeNode[childrenProp], treeNode);
                }
            } else if (typeof baseOpt.childrenGetter === "function") {
                const value = baseOpt.childrenGetter(treeNode);
                if (typeof value === "undefined") {
                    result = [];
                } else if (Array.isArray(value)) {
                    result = value;
                } else {
                    result = [];
                    baseOpt.worn && worringOptFuncShouldBe("childrenGetter", "Array", value, treeNode);
                }
            } else {
                baseOpt.worn && worringOptNotFunc("childrenGetter", baseOpt.childrenGetter, baseOpt);
            }
            break;
        }
    }

    return result;
}
