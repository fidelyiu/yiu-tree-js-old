import getListByTree from "../../src/get/get-list-by-tree";
import { TreeFilterOption } from "../../src/types";

const eachList: Array<{
    treeData: Array<any>;
    opt?: TreeFilterOption;
    result: Array<any>;
}> = [
    {
        treeData: [{ id: "86", name: "34", children: [{ id: "93", name: "23423424333" }] }],
        result: [
            { id: "86", name: "34", children: [{ id: "93", name: "23423424333" }] },
            { id: "93", name: "23423424333" },
        ],
    },
];

describe.each(eachList.map((item, index) => ({ treeData: item.treeData, opt: item.opt, result: item.result, index })))(
    "getListByTree: 根据Tree获取List",
    ({ treeData, opt, result, index }) => {
        it(`getTreeByList[${index}]测试`, () => {
            const data = getListByTree(treeData as unknown as Array<any>, opt);
            expect(data).toEqual(result);
        });
    }
);
