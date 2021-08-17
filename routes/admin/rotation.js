
const router = require("./_router");
const mainModel = require("../../models/main");

router.get("/rotation", async (req, res) =>
{
    res.render("admin/rotation.html");
});

// 分页
router.get("/rotation/data/:index/:pageItem", async (req, res) =>
{
    // paging start
    let index = Number(req.params.index) || 0;
    let pageItem = Number(req.params.pageItem) || 10;
    if (!mainModel.Rotation)
    {
        // 没有相关数据
        res.json(res._ok([], {
            index: 0, //	当前页
            pageItem: pageItem, //  每页条数
            allItem: 0, //  总条数
        }));
        return;
    }
    let count = await mainModel.Rotation.countDocuments(); //edit line
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

    let list = await mainModel.Rotation.find({}).skip(index2).limit(pageItem);

    res.json(res._ok(list, {
        index: index, //	当前页
        pageItem: pageItem, //  每页条数
        allItem: count, //  总条数
    }));
});


// 检测是否存在
router.get("/rotation/data-unique/:v", async (req, res) =>
{
    let code = req.params.v || "";
    let count = await mainModel.Rotation.countDocuments({code});
    if (count > 0)
    {
        res.json(false);
    } else
    {
        res.json(true);
    }

});

// 获取ids数组获取详细信息
router.get("/rotation/data-dtl/:ids", async (req, res) =>
{
    let ids = req.params.ids || "";
    ids = ids.split(",");
    let list = await mainModel.Rotation.find({
        _id: {
            $in: ids
        }
    });
    res.json(res._ok(list));
});


//  添加
router.post("/rotation/data", async (req, res) =>
{
    let o = new mainModel.Rotation({
        name: req.body.name,
        code: req.body.code,
        order: req.body.order,
        imgs: req.body.imgs || [],
    });

    let isok = o.validateSync();
    if (isok)
    {
        res.json(res._err(isok));
        return;
    }

    var rt = await mainModel.Rotation.create(o)
    if (!rt)
    {
        res.json(res._err("添加失败"));
        return;
    }
    res.json(res._ok(rt));
});


// 修改
router.put("/rotation/data", async (req, res) =>
{
    let id = req.body._id;
    let name = req.body.name;
    let code = req.body.code;
    let order = req.body.order;
    let imgs = req.body.imgs || [];

    try
    {
        id = mainModel.orm.mongoose.Types.ObjectId(id).toHexString();
    } catch (error)
    {
        res.json(res._err("_id 有误！"));
        return;
    }

    let v = await mainModel.Rotation.findByIdAndUpdate(id, {$set: {name, code, order, imgs}}, {new: true});
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
router.delete("/rotation/data/:listId", async (req, res) =>
{
    // let id = req.params.id;
    let listId = req.params.listId || "";
    listId = listId.split(",")
    let obj = await mainModel.Rotation.deleteMany({
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