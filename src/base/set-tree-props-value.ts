import { TreeBaseOpt, TreeKeyType } from "../types";
import { worringOptNotFunc } from "./worn-func";

export default function setTreePropsValue(treeNode: any, key: TreeKeyType, value: any, opt?: TreeBaseOpt): any {
    if (!treeNode) return undefined;
    const baseOpt: TreeBaseOpt = Object.assign({}, opt);
    switch (key) {
        case "id": {
            if (typeof baseOpt.idSetter === "undefined") {
                const idProp = baseOpt.idProp || "id";
                treeNode[idProp] = value;
            } else if (typeof baseOpt.idSetter === "function") {
                baseOpt.idSetter(treeNode, value);
            } else {
                baseOpt.worn && worringOptNotFunc("idSetter", baseOpt.idSetter, baseOpt);
            }
            break;
        }
        case "pid": {
            if (typeof baseOpt.pidSetter === "undefined") {
                const pidProp = baseOpt.pidProp || "pid";
                treeNode[pidProp] = value;
            } else if (typeof baseOpt.pidSetter === "function") {
                baseOpt.pidSetter(treeNode, value);
            } else {
                baseOpt.worn && worringOptNotFunc("pidSetter", baseOpt.pidSetter, baseOpt);
            }
            break;
        }
        case "children": {
            if (typeof baseOpt.pidSetter === "undefined") {
                const childrenProp = baseOpt.childrenProp || "children";
                treeNode[childrenProp] = value;
            } else if (typeof baseOpt.childrenSetter === "function") {
                baseOpt.childrenSetter(treeNode, value);
            } else {
                baseOpt.worn && worringOptNotFunc("childrenSetter", baseOpt.childrenSetter, baseOpt);
            }
            break;
        }
    }
}
