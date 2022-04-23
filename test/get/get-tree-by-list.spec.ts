import getTreeByList from "../../src/get/get-tree-by-list";
import { TreeFilterOption } from "../../src/types";

const eachList: Array<{
    listData: Array<any>;
    opt?: TreeFilterOption;
    result: Array<any>;
}> = [
    {
        listData: [
            { id: "32", parentId: undefined },
            { id: "40", parentId: undefined },
            { id: "41", parentId: "40" },
            { id: "42", parentId: "41" },
            { id: "47", parentId: "41" },
            { id: "102", parentId: undefined },
            { id: "101", parentId: undefined },
            { id: "103", parentId: undefined },
            { id: "116", parentId: undefined },
            { id: "86", parentId: undefined },
            { id: "93", parentId: "86" },
        ],
        opt: { pidProp: "parentId" },
        result: [
            { id: "32", children: [] },
            {
                id: "40",
                children: [
                    {
                        id: "41",
                        parentId: "40",
                        children: [
                            { id: "42", parentId: "41" },
                            { id: "47", parentId: "41" },
                        ],
                    },
                ],
            },
            { id: "102", children: [] },
            { id: "101", children: [] },
            { id: "103", children: [] },
            { id: "116", children: [] },
            { id: "86", children: [{ id: "93", parentId: "86" }] },
        ],
    },
];

describe.each(eachList.map((item, index) => ({ listData: item.listData, opt: item.opt, result: item.result, index })))(
    "getTreeByList: 根据List获取Tree",
    ({ listData, opt, result, index }) => {
        it(`getTreeByList[${index}]测试`, () => {
            const data = getTreeByList(listData as unknown as Array<any>, opt);
            expect(data).toEqual(result);
        });
    }
);
