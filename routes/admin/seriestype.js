const router = require("./_router");
const mainModel = require("../../models/main");

router.get("/seriestype", (req, res) =>
{
    res.render("admin/seriestype");
});

router.get("/seriestype/data", async (req, res) =>
{
    let SeriesTypes = await mainModel.SeriesType.find().sort({order: -1}).catch(err => { });
    if (!SeriesTypes)
    {
        SeriesTypes = [];
    }
    res.json(res._ok(SeriesTypes));
});

// 检测是否存在
router.get("/seriestype/data-unique/:v", async (req, res) =>
{
    let code = req.params.v || "";
    let count = await mainModel.SeriesType.countDocuments({code: code});
    if (count > 0)
    {
        res.json(false);
    } else
    {
        res.json(true);
    }

});

// 获取ids数组获取详细信息
router.get("/seriestype/data-dtl/:ids", async (req, res) =>
{
    let ids = req.params.ids || "";
    ids = ids.split(",");
    let list = await mainModel.SeriesType.find({
        _id: {
            $in: ids
        }
    });
    res.json(res._ok(list));
});

// 分页
router.get("/seriestype/data/:index/:pageItem", async (req, res) =>
{

    // paging start
    let index = Number(req.params.index) || 1;
    let pageItem = Number(req.params.pageItem) || 10;
    if (!mainModel.SeriesType)
    {
        // 没有相关数据
        res.json(res._ok([], {
            index: 0, //	当前页
            pageItem: pageItem, //  每页条数
            allItem: 0, //  总条数
        }));
        return;
    }
    let count = await mainModel.SeriesType.countDocuments(); //edit line
    if (count <= 0)
    {
        // 没有相关数据
        res.json(res._ok([], {
            index: 0, //	当前页
            pageItem: pageItem, //  每页条数
            allItem: count, //  总条数
        }));
    }
    let maxIndex = Math.ceil(count / pageItem);
    index = index > maxIndex ? maxIndex : index;
    let index2 = (index - 1) * pageItem;
    
    let list = await mainModel.SeriesType.find({}).sort({order: -1}).skip(index2).limit(pageItem);

    res.json(res._ok(list, {
        index: index, //	当前页
        pageItem: pageItem, //  每页条数
        allItem: count, //  总条数
    }));
});

//  添加
router.post("/seriestype/data", async (req, res) =>
{
    let name = req.body.name;
    let code = req.body.code || "";
    let order = Number(req.body.order) || 1;
    let o = new mainModel.SeriesType({name, code, order});
    let isok = o.validateSync();
    if (isok)
    {
        res.json(res._err(isok));
        return;
    }

    var rt = await mainModel.SeriesType.create(o)
    if (!rt)
    {
        res.json(res._err("添加失败"));
        return;
    }
    res.json(res._ok(rt));
});

// 修改
router.put("/seriestype/data", async (req, res) =>
{

    let id = req.body._id;
    let name = req.body.name || "";
    let order = req.body.order || "";

    let v = await mainModel.SeriesType.findByIdAndUpdate(id, {$set: {name, order}}, {new: true});
    if (!v)
    {
        res.json(res._err("修改失败"));
        return;
    } else
    {
        res.json(res._ok(v))
    }
});

// 删除
router.delete("/seriestype/data/:listId", async (req, res) =>
{
    // let id = req.params.id;
    let listId = req.params.listId || "";
    listId = listId.split(",")
    let obj = await mainModel.SeriesType.deleteMany({
        _id: {
            $in: listId
        }
    }).catch(err => { });

    if (!obj)
    {
        res.json(res._err());
        return;
    }
    res.json(res._ok(obj));

});

module.exports = router;