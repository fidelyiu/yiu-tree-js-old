# 1.YiuTree
`YiuTree`是一个操作树结构的js库，包括：过滤、层级、是否符合某种条件等操作。

# 2.数据结构
你可以自定义解析树的key的策略，如果你不指定策略，`YiuTree`将默认按照以下的结构解析你的树数据。
```js
const treeData = [
    {
        id: "1",
        children: [{ id: "1-1" }, { id: "1-2" }, { id: "1-3" }],
    },
    {
        id: "2",
        children: [{ id: "2-1" }, { id: "2-2" }, { id: "2-3" }],
    },
]
```

`YiuTree`处理数据时，默认你的数据是正确的
- 节点根据解析策略可以解析出值。
- `id`全树唯一。
- 你的树数据不是图数据（`children`没有循环引用）。

你可以使用`isTree`方法去判断你的数据是否是一个`YiuTree`可以处理的树数据。

> `YiuTree`处理`id`、`children`两个key外，对于`getTreeByList`中可能还需要`pid`这个key。

# 3.深拷贝
`YiuTree`中`get`、`op`类工具返回的都是深拷贝后的数据，`has`类工具返回的都是没有深拷贝的数据。

当然你可以自定义结果是否深拷贝，比如以下情况。
- `op`类工具你仅仅用于遍历，你可以关闭深拷贝。
- `has`类工具你在`searchFunc`修改了节点数据，但你不想改变原来的树数据，你可以开启深拷贝。

`YiuTree`中使用`JSON.parse(JSON.stringify(treeData))`深拷贝数据，这可能不满足你的要求，你也可以自定义深拷贝方法。


# 4.自定义规则

## 4.1.树解析配置对象
`YiuTree`工具的最后一个参数始终是树解析配置`YiuTreeType.TreeBaseOpt`，以下是他的类型定义。

```typescript
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
```

## 4.2.树解析配置对象使用

你有三种解析树节点的策略：
- `def`: 默认`id`、`children`、`pid`。
- `key`：使用给定的`opt.idProp`、`opt.childrenProp`、`opt.pidProp`作为key。
- `func`：使用给定的`opt.idGetter(node)`、`opt.childrenGetter(node)`、`opt.pidGetter(node)`函数执行结果作为值。

`func` > `key` > `def`。

以上说的是从节点中获取一个值的策略，而写入一个值的策略稍微不用的是`opt.idSetter`、`opt.childrenSetter`、`opt.pidSetter`。

当然目前使用的`YiuTree`仅涉及了`children`的写操作，其他的key只是预保留。

如果你不确定你的配置是否正确，可以使用`isTree`和`opt.worn`来查看树是否符合要求。`opt.worn`将一定程度上打印树中存在的异常。


# 5.API

## 5.1.`get`类

### 5.1.1.`getFilterBySearch`

根据搜索函数过滤出一个新的树，opt中有两个配置如下：
```typescript
export type TreeFilterOption = {
    /**
     * 默认false，父节点是否必须 需要匹配
     */
    parentMatch?: boolean;
    /**
     * 默认false，子节点是否必须 需要匹配
     */
    childrenMatch?: boolean;
}
```

使用如下：

场景1（普通搜索，只要节点匹配了，父子节点都匹配）
```js
const treeData = [
    {
        id: "1",
        name: "name-1",
        children: [
            { id: "1-1", name: "name-1-1" },
            { id: "1-2", name: "name-1-2" },
            { id: "1-3", name: "name-1-3" },
        ],
    },
    {
        id: "2",
        children: [
            { id: "2-1", name: "name-2-1" },
            { id: "2-2", name: "name-2-2" },
            { id: "2-3", name: "name-2-3" },
        ],
    },
]
const scFunc = (node, nodeInfo) => node?.name && node.name.indexOf("name-1") > -1;
const result = getFilterBySearch(treeData, scFunc)
// resut => [
//     {
//         id: "1",
//         name: "name-1",
//         children: [
//             { id: "1-1", name: "name-1-1" },
//             { id: "1-2", name: "name-1-2" },
//             { id: "1-3", name: "name-1-3" },
//         ],
//     },
// ]
```

场景2（普通搜索，只要节点匹配了，父子节点都匹配，自定义children）
```js
const treeData = [
    {
        id: "1",
        name: "name-1",
        cList: [
            { id: "1-1", name: "name-1-1" },
            { id: "1-2", name: "name-1-2" },
            { id: "1-3", name: "name-1-3" },
        ],
    },
    {
        id: "2",
        cList: [
            { id: "2-1", name: "name-2-1" },
            { id: "2-2", name: "name-2-2" },
            { id: "2-3", name: "name-2-3" },
        ],
    },
]
const scFunc = (node, nodeInfo) => node?.name && node.name.indexOf("name-1") > -1;
const opt = { childrenProp: "cList" }
const result = getFilterBySearch(treeData, scFunc, opt)
// resut => [
//     {
//         id: "1",
//         name: "name-1",
//         cList: [
//             { id: "1-1", name: "name-1-1" },
//             { id: "1-2", name: "name-1-2" },
//             { id: "1-3", name: "name-1-3" },
//         ],
//     },
// ]
```


### 5.1.2.`getListByTree`

### 5.1.3.`getMaxLevel`

### 5.1.4.`getOneNodeBySearch`

### 5.1.5.`getOneNodePathBySearch`

### 5.1.6.`getTreeByList`


## 5.2.`has`类

### 5.2.1.`hasBySearch`

## 5.3.`is`类

### 5.3.1.`isTree`

## 5.4.`op`类

### 5.4.1.`opAll`

### 5.4.2.`opBySearch`


# 6.注意

## 6.1.回调信息

`YiuTree`的`TreeSearchFunc`、和`TreeOperationFunc`都包含了节点的一些附加信息，这些信息在某些场景下很有用。

```typescript
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
};
/**
 * 树的搜索函数类型
 */
export type TreeSearchFunc = (treeNode: any, info?: TreeNodeInfo) => boolean;
/**
 * 树的操作函数类型
 */
export type TreeOperationFunc = (treeNode: any, info?: TreeNodeInfo) => void;
```

## 6.2.Tree Shaking
如果需要Tree Shaking，只要不全部`import`即可。
```js
// 👍good
import { getFilterBySearch } from "yiu-tree";

// 👎bad
import YiuTree from "yiu-tree";
```

TS类型
```typescript
// 👍good
import type { YiuTreeType } from "yiu-tree";
```
