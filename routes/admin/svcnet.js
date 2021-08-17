
const router = require("./_router");
const mainModel = require("../../models/main");

router.get("/svcnet", async (req, res) =>
{
    res.render("admin/svcnet.html");
});

// 分页
router.get("/svcnet/data/:index/:pageItem", async (req, res) =>
{

    // paging start
    let index = Number(req.params.index) || 0;
    let pageItem = Number(req.params.pageItem) || 10;
    if (!mainModel.Svcnet)
    {
        // 没有相关数据
        res.json(res._ok([], {
            index: 0, //	当前页
            pageItem: pageItem, //  每页条数
            allItem: 0, //  总条数
        }));
        return;
    }
    let count = await mainModel.Svcnet.countDocuments(); //edit line
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
    let list = await mainModel.Svcnet.find({}).skip(index2).limit(pageItem);

    res.json(res._ok(list, {
        index: index, //	当前页
        pageItem: pageItem, //  每页条数
        allItem: count, //  总条数
    }));
});


// 检测是否存在
router.get("/svcnet/data-unique/:v", async (req, res) =>
{
    let code = req.params.v || "";
    let count = await mainModel.Svcnet.countDocuments({code});
    if (count > 0)
    {
        res.json(false);
    } else
    {
        res.json(true);
    }

});

// 获取ids数组获取详细信息
router.get("/svcnet/data-dtl/:ids", async (req, res) =>
{
    let ids = req.params.ids || "";
    ids = ids.split(",");
    let list = await mainModel.Svcnet.find({
        _id: {
            $in: ids
        }
    });
    res.json(res._ok(list));
});

//  添加
router.post("/svcnet/data", async (req, res) =>
{
    let o = new mainModel.Svcnet({
        name: req.body.name,
        code: req.body.code,
        order: req.body.order,
        tel: req.body.tel,
        addr: req.body.addr,
        imgs: req.body.imgs || [],
    });

    let isok = o.validateSync();
    if (isok)
    {
        res.json(res._err(isok));
        return;
    }

    var rt = await mainModel.Svcnet.create(o)
    if (!rt)
    {
        res.json(res._err("添加失败"));
        return;
    }
    res.json(res._ok(rt));
});

// 修改
router.put("/svcnet/data", async (req, res) =>
{
    let id = req.body._id;
    let name = req.body.name;
    let code = req.body.code;
    let order = req.body.order;
    let tel = req.body.tel;
    let addr = req.body.addr;
    let imgs = req.body.imgs || [];

    try
    {
        id = mainModel.orm.mongoose.Types.ObjectId(id).toHexString();
    } catch (error)
    {
        res.json(res._err("_id 有误！"));
        return;
    }

    let v = await mainModel.Svcnet.findByIdAndUpdate(id, {$set: {name, code, order, imgs, tel, addr}}, {new: true});
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
router.delete("/svcnet/data/:listId", async (req, res) =>
{
    // let id = req.params.id;
    let listId = req.params.listId || "";
    listId = listId.split(",")
    let obj = await mainModel.Svcnet.deleteMany({
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