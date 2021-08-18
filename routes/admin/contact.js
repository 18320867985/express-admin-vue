
const router = require("./_router");
const mainModel = require("../../models/main");

router.get("/contact", async (req, res) =>
{
    res.render("admin/contact.html");
});

// 分页
router.get("/contact/data/:index/:pageItem", async (req, res) =>
{
    // paging start
    let index = Number(req.params.index) || 0;
    let pageItem = Number(req.params.pageItem) || 10;
    if (!mainModel.Contact)
    {
        // 没有相关数据
        res.json(res._ok([], {
            index: 0, //	当前页
            pageItem: pageItem, //  每页条数
            allItem: 0, //  总条数
        }));
        return;
    }
    let count = await mainModel.Contact.countDocuments(); //edit line
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

    let list = await mainModel.Contact.find({}).skip(index2).limit(pageItem).sort({order: -1});

    res.json(res._ok(list, {
        index: index, //	当前页
        pageItem: pageItem, //  每页条数
        allItem: count, //  总条数
    }));
});

// 检测是否存在
router.get("/contact/data-unique/:v", async (req, res) =>
{
    let code = req.params.v || "";
    let count = await mainModel.Contact.countDocuments({code});
    if (count > 0)
    {
        res.json(false);
    } else
    {
        res.json(true);
    }

});

// 获取ids数组获取详细信息
router.get("/contact/data-dtl/:ids", async (req, res) =>
{
    let ids = req.params.ids || "";
    ids = ids.split(",");
    let list = await mainModel.Contact.find({
        _id: {
            $in: ids
        }
    });
    res.json(res._ok(list));
});

//  添加
router.post("/contact/data", async (req, res) =>
{
    let o = new mainModel.Contact({
        name: req.body.name,
        code: req.body.code,
        order: req.body.order,
        x: req.body.x,
        y: req.body.y,
        addr: req.body.addr,
        tel: req.body.tel,

    });

    let isError = o.validateSync();
    if (isError)
    {
        res.json(res._err(null,isError));
        return;
    }

    var rt = await mainModel.Contact.create(o)
    if (!rt)
    {
        res.json(res._err("添加失败"));
        return;
    }
    res.json(res._ok(rt));
});

// 修改
router.put("/contact/data", async (req, res) =>
{

    let id = req.body._id;
    let name = req.body.name;
    let order = req.body.order;
    let x = req.body.x;
    let y = req.body.y;
    let tel = req.body.tel;
    let addr = req.body.addr;
    try
    {
        id = mainModel.orm.mongoose.Types.ObjectId(id).toHexString();
    } catch (error)
    {
        res.json(res._err("_id 有误！"));
        return;
    }

    let v = await mainModel.Contact.findByIdAndUpdate(id, {$set: {name, order, x, y, tel, addr}}, {new: true});
    if (!v)
    {
        res.json(res._err("修改失败"));
        return;
    } else
    {
        res.json(res._ok(v))/*  */
    }
});

// 删除
router.delete("/contact/data/:listId", async (req, res) =>
{
    // let id = req.params.id;
    let listId = req.params.listId || "";
    listId = listId.split(",")
    let obj = await mainModel.Contact.deleteMany({
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