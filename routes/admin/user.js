
const router = require("./_router");
const mainModel = require("../../models/main");
const cpy = require("../../libs/crypto");

router.get("/user", async (req, res) =>
{
    res.render("admin/user.html");
});

// 检测是否存在
router.get("/user/data-unique/:v", async (req, res) =>
{
    let name = req.params.v || "";
    let count = await mainModel.User.countDocuments({name: name});
    if (count > 0)
    {
        res.json(false);
    } else
    {
        res.json(true);
    }

});

// 获取ids数组获取详细信息
router.get("/user/data-dtl/:ids", async (req, res) =>
{
    let ids = req.params.ids || "";
    ids = ids.split(",");
    let list = await mainModel.User.find({
        _id: {
            $in: ids
        }
    }).populate("roleId", "name code");
    res.json(res._ok(list));
});

// 分页
router.get("/user/data/:index/:pageItem", async (req, res) =>
{

    // paging start
    let index = Number(req.params.index) || 0;
    let pageItem = Number(req.params.pageItem) || 10;
    if (!mainModel.User)
    {
        // 没有相关数据
        res.json(res._ok([], {
            index: 0, //	当前页
            pageItem: pageItem, //  每页条数
            allItem: 0, //  总条数
        }));
        return;
    }
    let count = await mainModel.User.countDocuments(); //edit line
    if (count <= 0)
    {
        // 没有相关数据
        res.json(res._ok([], {
            index: 0, //	当前页
            pageItem: pageItem, //  每页条数
            allItem: count, //  总条数
        }));
    }
    let maxIndex = Math.ceil(count / pageItem) || 0;
    index = index > maxIndex ? maxIndex : index;
    let index2 = (index - 1) * pageItem;
    // paging end

    let list = await mainModel.User.find({}).populate("roleId", "name code").skip(index2).limit(pageItem);

    res.json(res._ok(list, {
        index: index, //	当前页
        pageItem: pageItem, //  每页条数
        allItem: count, //  总条数
    }));
});

//  添加
router.post("/user/data", async (req, res) =>
{
    let user = new mainModel.User({
        name: req.body.name,
        pwd: cpy.md5(req.body.pwd),
        email: req.body.email,
        roleId: req.body.roleId
    });

    let isok = user.validateSync();
    if (isok)
    {
        res.json(res._err(isok));
        return;
    }

    var count = await mainModel.User.countDocuments({name: user.name});
    if (count > 0)
    {
        res.json(res._err("用户名已存在！"));
        return;
    };

    var userinfo = await mainModel.User.create(user)
    if (!userinfo)
    {
        res.json(res._err("添加失败"));
        return;
    }
    res.json(res._ok(userinfo));
});

// 修改
router.put("/user/data", async (req, res) =>
{
    let id = req.body._id;
    let roleId = req.body.roleId;
    try
    {
        roleId = mainModel.orm.mongoose.Types.ObjectId(roleId).toHexString();
    } catch (error)
    {
        res.json(res._err("用户类型 roleId 有误！"));
        return;
    }
    let v = await mainModel.User.findByIdAndUpdate(id, {$set: {roleId}}, {new: true});
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
router.delete("/user/data/:listId", async (req, res) =>
{
    // let id = req.params.id;
    let listId = req.params.listId || "";
    listId = listId.split(",")
    let obj = await mainModel.User.deleteMany({
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