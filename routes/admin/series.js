
const router = require("./_router");
const mainModel = require("../../models/main");

router.get("/series", async (req, res) =>
{
    res.render("admin/series.html");
});

// 分页
router.get("/series/data/:index/:pageItem", async (req, res) =>
{
    // paging start
    let index = Number(req.params.index) || 0;
    let pageItem = Number(req.params.pageItem) || 10;
    if (!mainModel.Series)
    {
        // 没有相关数据
        res.json(res._ok([], {
            index: 0, //	当前页
            pageItem: pageItem, //  每页条数
            allItem: 0, //  总条数
        }));
        return;
    }
    let count = await mainModel.Series.countDocuments(); //edit line
    if (count <= 0)
    {
        // 没有相关数据
        res.json(res._ok([], {
            index: 0, //	当前页
            pageItem: pageItem, //  每页条数
            allItem: count, //  总条数
        }));
        return;
    }
    let maxIndex = Math.ceil(count / pageItem) || 0;
    index = index > maxIndex ? maxIndex : index;
    let index2 = (index - 1) * pageItem;
    // paging end

    let list = await mainModel.Series.find({}).skip(index2).limit(pageItem).sort({order: -1});

    res.json(res._ok(list, {
        index: index, //	当前页
        pageItem: pageItem, //  每页条数
        allItem: count, //  总条数
    }));
});

// 检测是否存在
router.get("/series/data-unique/:v", async (req, res) =>
{
    let code = req.params.v || "";
    let count = await mainModel.Series.countDocuments({code});
    if (count > 0)
    {
        res.json(false);
    } else
    {
        res.json(true);
    }

});

// 获取ids数组获取详细信息
router.get("/series/data-dtl/:ids", async (req, res) =>
{
    let ids = req.params.ids || "";
    ids = ids.split(",");
    let list = await mainModel.Series.find({
        _id: {
            $in: ids
        }
    });
    res.json(res._ok(list));
});

//  添加
router.post("/series/data", async (req, res) =>
{
    let o = new mainModel.Series({
        name: req.body.name,
        code: req.body.code,
        order: req.body.order,
        seriestypeId: req.body.seriestypeId,
        imgs: req.body.imgs || [],
    });

    let isError = o.validateSync();
    if (isError)
    {
        res.json(res._err(null,isError));
        return;
    }

    var rt = await mainModel.Series.create(o)
    if (!rt)
    {
        res.json(res._err("添加失败"));
        return;
    }
    res.json(res._ok(rt));
});

// 修改
router.put("/series/data", async (req, res) =>
{
    let id = req.body._id;
    let name = req.body.name;
    let order = req.body.order;
    let desc = req.body.desc;
    let seriestypeId = req.body.seriestypeId;
    let imgs = req.body.imgs || [];

    try
    {
        id = mainModel.orm.mongoose.Types.ObjectId(id).toHexString();
    } catch (error)
    {
        res.json(res._err("_id 有误！"));
        return;
    }

    let v = await mainModel.Series.findByIdAndUpdate(id, {$set: {name, order, desc, imgs, seriestypeId}}, {new: true});
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
router.delete("/series/data/:listId", async (req, res) =>
{
    // let id = req.params.id;
    let listId = req.params.listId || "";
    listId = listId.split(",")
    let obj = await mainModel.Series.deleteMany({
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