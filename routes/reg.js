
var router = require('./_router');
const mainModel = require("../models/main");

router.get("/reg", (req, res) =>
{
    res.render("admin/reg");
});

router.post("/reg/data", async (req, res) =>
{
    let user = new mainModel.User({name: req.body.user, pwd: req.body.pwd, email: req.body.email});
    //  var o=  await mainModel.UserRole.create(new mainModel.UserRole({name:"普通用户",code:3}));
    let rule = await mainModel.UserRole.findOne({code: 0}); //普通用户
    if (!rule)
    {
        res.json(res._err(rule));
        return;
    }
    user.roleId = rule._id;
    let isok = user.validateSync();
    if (isok)
    {
        res.json(res._err(isok));
        return;
    }

    // 检查用户是否存在
    var count = await mainModel.User.countDocuments({name: user.name});
    if (count > 0)
    {
        res.json(res._err("用户名已存在！"));
        return;
    };

    var userinfo = await mainModel.User.create(user)
    if (!userinfo)
    {
        res.json(res._ok("注册失败"));
        return;
    }
    req.session.login = {
        isLogin: true,
        code: 1,
        user: userinfo
    }
    res.json(res._ok(userinfo))
});

module.exports = router;