export type TreeNodeInfo = {
    /**
     * 层级数
     */
    level: number;
    /**
     * 当前List中索引数
     */
    index: number;
    /**
     * 是否是叶子节点
     */
    isLeaf: boolean;
    /**
     * 是否是第一个节点
     */
    isFirst: boolean;
    /**
     * 是否是最后一个节点
     */
    isLast: boolean;
    /**
     * 父节点
     */
    parent: any;
    /**
     * 节点路径
     */
    path: readonly any[];
    /**
     * 父节点路径
     */
    parentPath: readonly any[];
};
/**
 * 树的搜索函数类型
 */
export type TreeSearchFunc = (treeNode: any, info?: TreeNodeInfo) => boolean;
/**
 * 树的操作函数类型
 */
export type TreeOperationFunc = (treeNode: any, info?: TreeNodeInfo) => void;
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
} & TreeBaseOpt;

export type TreeKeyType = "id" | "pid" | "children";
export type TreeBaseOpt = {
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
    /**
     * 是否深拷贝
     */
    deepClone?: boolean;
    /**
     * 深拷贝函数
     * 默认`JSON.parse(JSON.stringify(data))`
     */
    deepCloneFunc?: Function;
};
