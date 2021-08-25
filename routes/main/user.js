
const router = require("./_router");
const mainModel = require("../../models/main");
const cpy = require("../../libs/crypto");
const mainCtrl = require("../../controllers/main");

// 检测是否存在
router.get("/user/data-unique/:v", async (req, res) =>
{
    let name = req.params.v || "";
    let data = await mainCtrl.user.unique(name);
    res.json(data)
});

// 获取ids数组获取详细信息
router.get("/user/data-dtl/:ids", async (req, res) =>
{
    let ids = req.params.ids || '';
    ids = ids.split(',');
    let data = await mainCtrl.user.getDataDtl(ids);
    res.json(data);

});


// 分页
router.get("/user/data/:pageIndex/:pageSize", async (req, res) =>
{
    // paging start
    let pageIndex = Number(req.params.pageIndex);
    let pageSize = Number(req.params.pageSize);
    let data = await mainCtrl.user.getData(pageIndex, pageSize, req.query);
    res.json(data);

});

//  添加
router.post("/user/data", async (req, res) =>
{
    let obj = req.body || {};
    var user = {
        name: obj.name,
        pwd: cpy.md5(obj.pwd),
        email: obj.email,
        roleId: obj.roleId,
        phone: obj.phone
    }
    let data = await mainCtrl.user.postData(user);
    res.json(data);
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
router.delete("/user/data/:ids", async (req, res) =>
{
    let ids = req.params.ids || '';
    ids = ids.split(',');
    let data = await mainCtrl.user.deleteData(ids);
    res.json(data);

});

module.exports = router;