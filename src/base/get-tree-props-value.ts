import { TreeBaseOpt, TreeKeyType } from "../types";
import { worringKey, worringKeyMode, worringKeyShouldBe, worringOptFuncShouldBe, worringOptNotFind, worringOptNotFunc, worrinPropNotFind } from "./worn-func";

export default function getTreePropsValue(treeNode: any, key: TreeKeyType, opt?: TreeBaseOpt): any {
    let result;
    if (!treeNode) return undefined;
    const baseOpt: TreeBaseOpt = Object.assign({ keyMode: "def" }, opt);
    switch (baseOpt.keyMode) {
        case "def": {
            switch (key) {
                case "id": {
                    if (treeNode.id) {
                        result = treeNode.id;
                    } else {
                        baseOpt.worn && worrinPropNotFind("id", treeNode);
                    }
                    break;
                }
                case "pid": {
                    if (treeNode.pid) {
                        result = treeNode.pid;
                    } else {
                        baseOpt.worn && worrinPropNotFind("pid", treeNode);
                    }
                    break;
                }
                case "children": {
                    if (typeof treeNode.children === "undefined") {
                        result = [];
                    } else if (Array.isArray(treeNode.children)) {
                        result = treeNode.children;
                    } else {
                        result = [];
                        baseOpt.worn && worringKeyShouldBe("children", "Array", treeNode.children, treeNode);
                    }
                    break;
                }
                default: {
                    baseOpt.worn && worringKey(key);
                    break;
                }
            }
            break;
        }
        case "key": {
            switch (key) {
                case "id": {
                    if (baseOpt.idProp) {
                        if (treeNode[baseOpt.idProp]) {
                            result = treeNode[baseOpt.idProp];
                        } else {
                            baseOpt.worn && worrinPropNotFind(baseOpt.idProp, treeNode);
                        }
                    } else {
                        baseOpt.worn && worringOptNotFind("idProp", baseOpt);
                    }
                    break;
                }
                case "pid": {
                    if (baseOpt.pidProp) {
                        if (treeNode[baseOpt.pidProp]) {
                            result = treeNode[baseOpt.pidProp];
                        } else {
                            baseOpt.worn && worrinPropNotFind(baseOpt.pidProp, treeNode);
                        }
                    } else {
                        baseOpt.worn && worringOptNotFind("pidProp", baseOpt);
                    }
                    break;
                }
                case "children": {
                    if (baseOpt.childrenProp) {
                        if (typeof treeNode[baseOpt.childrenProp] === "undefined") {
                            result = [];
                        } else if (Array.isArray(treeNode[baseOpt.childrenProp])) {
                            result = treeNode[baseOpt.childrenProp];
                        } else {
                            result = [];
                            baseOpt.worn && worringKeyShouldBe(baseOpt.childrenProp, "Array", treeNode[baseOpt.childrenProp], treeNode);
                        }
                    } else {
                        baseOpt.worn && worringOptNotFind("childrenProp", baseOpt);
                    }
                    break;
                }
                default: {
                    baseOpt.worn && worringKey(key);
                    break;
                }
            }
            break;
        }
        case "func": {
            switch (key) {
                case "id": {
                    if (typeof baseOpt.idGetter === "function") {
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
                    if (typeof baseOpt.pidGetter === "function") {
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
                    if (typeof baseOpt.childrenGetter === "function") {
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
                default: {
                    baseOpt.worn && worringKey(key);
                    break;
                }
            }
            break;
        }
        default: {
            baseOpt.worn && worringKeyMode(baseOpt.keyMode);
            break;
        }
    }

    return result;
}
