export const worringKey = (value: any) => console.warn(`The key is not in "id", "pid", or "children". The value received is ${value}`);
export const worringKeyShouldBe = (key: string, type: string, value: any, treeNode: any) =>
    console.warn(`Tree's "${key}" attribute should be a "${type}", but a "${typeof value}" is received.`, treeNode);
export const worringKeyMode = (value: any) => console.warn(`The opt.keyMode is not in "def", "key", or "func". The value received is ${value}`);
export const worringOptNotFind = (key: string, opt: any) => console.warn(`The "${key}" attribute is not detected in the TreeOpt.`, opt);
export const worringOptNotFunc = (key: string, value: any, opt: any) =>
    console.warn(`The "${key}" attribute should be a function in the TreeOpt. but receives a "${typeof value}"`, opt);
export const worringOptFuncShouldBe = (key: string, type: string, value: any, treeNode: any) =>
    console.warn(`TreeOpt's "${key}" execution result type should be a "${type}", but a "${typeof value}" is received.`, treeNode);
export const worrinPropNotFind = (key: string, treeNode: any) => console.warn(`The "${key}" attribute is not detected in the TreeNode.`, treeNode);
