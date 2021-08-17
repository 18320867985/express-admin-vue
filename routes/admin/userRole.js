const router = require("./_router");
const mainModel = require("../../models/main");

router.get("/userRole", (req, res) =>
{
    res.render("admin/userrole");
});

router.get("/userRole/data", async (req, res) =>
{

    let userRoles = await mainModel.UserRole.find().sort({order: -1}).catch(err => { });
    if (!userRoles)
    {
        userRoles = [];
    }
    res.json(res._ok(userRoles));
});


// 检测是否存在
router.get("/userRole/data-unique/:v", async (req, res) =>
{
    let code = req.params.v || "";
    let count = await mainModel.UserRole.countDocuments({code: code});
    if (count > 0)
    {
        res.json(false);
    } else
    {
        res.json(true);
    }

});

// 获取ids数组获取详细信息
router.get("/userRole/data-dtl/:ids", async (req, res) =>
{
    let ids = req.params.ids || "";
    ids = ids.split(",");
    let list = await mainModel.UserRole.find({
        _id: {
            $in: ids
        }
    });
    res.json(res._ok(list));
});

// 分页
router.get("/userRole/data/:index/:pageItem", async (req, res) =>
{

    // paging start
    let index = Number(req.params.index) || 1;
    let pageItem = Number(req.params.pageItem) || 10;
    if (!mainModel.UserRole)
    {
        // 没有相关数据
        res.json(res._ok([], {
            index: 0, //	当前页
            pageItem: pageItem, //  每页条数
            allItem: 0, //  总条数
        }));
        return;
    }
    let count = await mainModel.UserRole.countDocuments(); //edit line
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
    // paging end

    let list = await mainModel.UserRole.find({}).sort({order: -1}).skip(index2).limit(pageItem);

    res.json(res._ok(list, {
        index: index, //	当前页
        pageItem: pageItem, //  每页条数
        allItem: count, //  总条数
    }));
});

//  添加
router.post("/userRole/data", async (req, res) =>
{
    let name = req.body.name;
    let code = Number(req.body.code) || 1;
    let order = Number(req.body.order) || 1;
    let o = new mainModel.UserRole({name, code, order});
    let isok = o.validateSync();
    if (isok)
    {
        res.json(res._err(isok));
        return;
    }

    var rt = await mainModel.UserRole.create(o)
    if (!rt)
    {
        res.json(res._err("添加失败"));
        return;
    }
    res.json(res._ok(rt));
});

// 修改
router.put("/userRole/data", async (req, res) =>
{

    let id = req.body._id;
    let name = req.body.name || "";
    let order = req.body.order || "";

    let v = await mainModel.UserRole.findByIdAndUpdate(id, {$set: {name, order}}, {new: true});
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
router.delete("/userRole/data/:listId", async (req, res) =>
{
    // let id = req.params.id;
    let listId = req.params.listId || "";
    listId = listId.split(",")
    let obj = await mainModel.UserRole.deleteMany({
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