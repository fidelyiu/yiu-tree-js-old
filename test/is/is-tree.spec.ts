import isTree from "../../src/is/is-tree";

const CircularReferenceObj: any = { id: "CircularReferenceObj" };
const b: any = { id: "b" };
CircularReferenceObj.children = [b];
b.children = [CircularReferenceObj];

describe.each(
    [
        { treeData: "2022-03-12 00:00:00:000", result: false },
        { treeData: [], result: true },
        { treeData: [CircularReferenceObj], result: false },
        { treeData: CircularReferenceObj, result: false },
        {
            treeData: [
                {
                    id: "1",
                    children: [{ id: "1-1" }, { id: "1-2" }, { id: "1-3" }],
                },
                {
                    id: "2",
                    children: [{ id: "2-1" }, { id: "2-2" }, { id: "2-3" }],
                },
            ],
            result: true,
        },
        {
            treeData: [
                {
                    id: "1",
                    children: [{ id: "1-1" }, { id: "1-2" }, { id: "1-3" }],
                },
                {
                    id: "2",
                    children: [{ id: "1-1" }, { id: "1-2" }, { id: "1-3" }],
                },
            ],
            result: false,
        },
        {
            treeData: [
                {
                    id: "1",
                    children: [{ id: "1-1" }, { id: "1-2" }, { id: "1-3" }],
                },
                {
                    id: "2",
                    children: [
                        {
                            id: "2-1",
                            children: [{ id: "2-1-1" }, { id: "2-1-2" }, { id: "2-1-3" }],
                        },
                        { id: "2-2" },
                        { id: "2-3" },
                    ],
                },
            ],
            result: true,
        },
        {
            treeData: [
                {
                    id: "1",
                    children: [{ id: "1-1" }, { id: "1-2" }, { id: "1-3" }],
                },
                {
                    id: "2",
                    children: [
                        {
                            id: "2-1",
                            children: [{ id: "2-1-1" }, { id: "2-1-1" }],
                        },
                        { id: "2-2" },
                        { id: "2-3" },
                    ],
                },
            ],
            result: false,
        },
    ].map((item, index) => ({ treeData: item.treeData, result: item.result, index }))
)("isTree: 是否是树", ({ treeData, result, index }) => {
    it(`isTree[${index}]测试`, () => {
        const data = isTree(treeData as unknown as Array<any>);
        expect(data).toBe(result);
    });
});
