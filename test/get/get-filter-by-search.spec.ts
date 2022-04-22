import getFilterBySearch from "../../src/get/get-filter-by-search";

const CircularReferenceObj: any = { id: "CircularReferenceObj" };
const b: any = { id: "b" };
CircularReferenceObj.children = [b];
b.children = [CircularReferenceObj];

describe.each(
    [
        {
            treeData: [
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
            ],
            scFunc: (node: any) => node?.name && node.name.indexOf("name-1") > -1,
            opt: undefined,
            result: [
                {
                    id: "1",
                    name: "name-1",
                    children: [
                        { id: "1-1", name: "name-1-1" },
                        { id: "1-2", name: "name-1-2" },
                        { id: "1-3", name: "name-1-3" },
                    ],
                },
            ],
        },
    ].map((item, index) => ({ treeData: item.treeData, scFunc: item.scFunc, opt: item.opt, result: item.result, index }))
)("getFilterBySearch: 树过滤", ({ treeData, scFunc, opt, result, index }) => {
    it(`getFilterBySearch[${index}]测试`, () => {
        const data = getFilterBySearch(treeData as unknown as Array<any>, scFunc, opt);
        expect(data).toEqual(result);
    });
});
