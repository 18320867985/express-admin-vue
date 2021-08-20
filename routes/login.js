
var router = require('./_router');
const mainModel = require("../models/main");
const cpy = require("../libs/crypto");
const jwt = require("../libs/jwt");

router.post("/login/data", async (req, res) =>
{
    let name = req.body.user || "";
    let pwd = cpy.md5(req.body.pwd || "");
    var userinfo = await mainModel.User.findOne({name:name, pwd:pwd},{pwd:0});
    if (!userinfo)
    {
        res.json(res._err(null, "用户名与密码不匹配！"));
        return;
    }

    // 生成token值 去校验
    let token = jwt.sign(userinfo._id);
    let decode=  jwt.decode(token);
    res.json(res._ok({token,userinfo},{ msg:"登录成功！",exp:decode.exp, iat:decode.iat}));
    return;
});

router.post("/logout/data", (req, res) =>
{
    res.json(res._ok("ok"));
    return;
});

module.exports = router;