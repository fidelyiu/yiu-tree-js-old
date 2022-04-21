import { TreeBaseOpt, TreeKeyType } from "../types";
import { worringKey, worringKeyMode, worringOptNotFind, worringOptNotFunc } from "./worn-func";

export default function setTreePropsValue(treeNode: any, key: TreeKeyType, value: any, opt?: TreeBaseOpt): any {
    let result;
    if (!treeNode) return undefined;
    const baseOpt: TreeBaseOpt = Object.assign({ keyMode: "def" }, opt);
    switch (baseOpt.keyMode) {
        case "def": {
            switch (key) {
                case "id": {
                    treeNode.id = value;
                    break;
                }
                case "pid": {
                    treeNode.pid = value;
                    break;
                }
                case "children": {
                    treeNode.children = value;
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
                        treeNode[baseOpt.idProp] = value;
                    } else {
                        baseOpt.worn && worringOptNotFind("idProp", baseOpt);
                    }
                    break;
                }
                case "pid": {
                    if (baseOpt.pidProp) {
                        treeNode[baseOpt.pidProp] = value;
                    } else {
                        baseOpt.worn && worringOptNotFind("pidProp", baseOpt);
                    }
                    break;
                }
                case "children": {
                    if (baseOpt.childrenProp) {
                        treeNode[baseOpt.childrenProp] = value;
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
                    if (typeof baseOpt.idSetter === "function") {
                        baseOpt.idSetter(treeNode, value);
                    } else {
                        baseOpt.worn && worringOptNotFunc("idSetter", baseOpt.idSetter, baseOpt);
                    }
                    break;
                }
                case "pid": {
                    if (typeof baseOpt.pidSetter === "function") {
                        baseOpt.pidSetter(treeNode, value);
                    } else {
                        baseOpt.worn && worringOptNotFunc("pidSetter", baseOpt.pidSetter, baseOpt);
                    }
                    break;
                }
                case "children": {
                    if (typeof baseOpt.childrenSetter === "function") {
                        baseOpt.childrenSetter(treeNode, value);
                    } else {
                        baseOpt.worn && worringOptNotFunc("childrenSetter", baseOpt.childrenSetter, baseOpt);
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
