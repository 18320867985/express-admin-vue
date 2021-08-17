
var router = require('./_router');
const mainModel = require("../models/main");
const cpy = require("../libs/crypto");
//const jwt = require("../libs/jwt");

router.get("/login", async (req, res) =>
{
    res.render("admin/login");
});

router.get("/login/not", async (req, res) =>
{
    res.render("/admin/not");
});

router.post("/login/data", async (req, res) =>
{
    let name = req.body.user || "";
    let pwd = cpy.md5(req.body.pwd || "");
    var userinfo = await mainModel.User.findOne({name, pwd});

    if (!userinfo)
    {
        res.json(res._err("用户名与密码不匹配！"));
        return;
    }

    // session 去校验
    req.session.login = {
        isLogin: true,
        code: 1,
        user: userinfo
    };

    // 生成token值 去校验
    // let token = jwt.sign(userinfo._id);
    // res.json(res._ok({token}, "登录成功！"));
     res.json(res._ok({}, "登录成功！"));
    return;
});

router.post("/logout/data", (req, res) =>
{
    if (req.session.login)
    {
        req.session.login.isLogin = false;
        req.session.login.code = 0;
        req.session.login.user = null;
    }
    res.json(res._ok("ok"));
    return;
});

module.exports = router;