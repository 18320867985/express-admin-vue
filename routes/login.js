
var router = require('./_router');
const mainModel = require("../models/main");
const cpy = require("../libs/crypto");
const jwt = require("../libs/jwt");

router.post("/login/data", async (req, res) =>
{
    let name = req.body.user || "";
    let pwd = cpy.md5(req.body.pwd || "");
    var userinfo = await mainModel.User.findOne({name, pwd});

    if (!userinfo)
    {
        res.json(res._err(null, "用户名与密码不匹配！"));
        return;
    }

    // 生成token值 去校验
    let token = jwt.sign(userinfo._id);
    res.json(res._ok({token}, "登录成功！"));
    return;
});

router.post("/logout/data", (req, res) =>
{
    res.json(res._ok("ok"));
    return;
});

module.exports = router;