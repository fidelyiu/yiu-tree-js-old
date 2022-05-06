import { TreeBaseOpt } from "../../src/types";
import { getLeafNodeByList } from "../../src";

const eachList: Array<{
    nodeList: Array<any>;
    opt?: TreeBaseOpt;
    result: Array<any>;
}> = [
    {
        nodeList: [],
        result: [],
    },
    {
        nodeList: undefined as unknown as Array<any>,
        result: [],
    },
    {
        nodeList: 123 as unknown as Array<any>,
        result: [],
    },
    {
        nodeList: [
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 },
            { id: 5 },
            { id: 6, pid: 1 },
            { id: 7, pid: 1 },
            { id: 8, pid: 1 },
            { id: 9, pid: 8 },
            { id: 10, pid: 8 },
            { id: 11, pid: 10 },
        ],
        result: [
            // 叶子节点
            { id: 2 },
            { id: 3 },
            { id: 4 },
            { id: 5 },
            { id: 6, pid: 1 },
            { id: 7, pid: 1 },
            { id: 9, pid: 8 },
            { id: 11, pid: 10 },
        ],
    },
];

describe.each(eachList.map((item, index) => ({ nodeList: item.nodeList, opt: item.opt, result: item.result, index })))(
    "getFilterBySearch: 树过滤",
    ({ nodeList, opt, result, index }) => {
        it(`getLeafNodeByList[${index}]测试`, () => {
            const data = getLeafNodeByList(nodeList as unknown as Array<any>, opt);
            expect(data).toEqual(result);
        });
    }
);
