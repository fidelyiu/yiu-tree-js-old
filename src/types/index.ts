/**
 * 树的搜索函数类型
 */
export type TreeSearchFunc = (treeNode: any, level: number, index: number) => boolean;
/**
 * 树的操作函数类型
 */
export type TreeOperationFunc = (treeNode: any, level: number, index: number) => void;
/**
 * 树的过滤配置类型
 */
export type TreeFilterOption = {
    /**
     * 默认false，父节点是否必须 需要匹配
     */
    parentMatch?: boolean;
    /**
     * 默认false，子节点是否必须 需要匹配
     */
    childrenMatch?: boolean;
    deepCloneFunc?: Function;
} & TreeBaseOpt;

export type TreeKeyType = "id" | "pid" | "children";
export type TreeBaseOptKeyMode = "def" | "key" | "func";
export type TreeBaseOpt = {
    /**
     * 解析key的方式
     */
    keyMode?: TreeBaseOptKeyMode;
    /**
     * 使用`key`解析时
     */
    idProp?: string;
    pidProp?: string;
    childrenProp?: string;
    /**
     * 当传参错误时是否警告
     */
    worn?: boolean;
    /**
     * 使用`func`解析时
     */
    idGetter?: (treeNode: any) => string;
    idSetter?: (treeNode: any, value: any) => void;
    pidGetter?: (treeNode: any) => string;
    pidSetter?: (treeNode: any, value: any) => void;
    childrenGetter?: (treeNode: any) => Array<any> | undefined;
    childrenSetter?: (treeNode: any, value: any) => void;
};
