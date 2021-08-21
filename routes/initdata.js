
var router = require('./_router');
const mainModel = require("../models/main");
const jwt = require("../libs/jwt");

router.get("/init/data", async (req, res) =>
{
    let token = req.headers[ 'access-token' ];  // 接受必须是小写
    let decode=  jwt.decode(token);
    var userinfo = await mainModel.User.findById(decode.data,{pwd:0}).populate("roleId", "name code");;
    if (!userinfo)
    {
        res.json(res._err(null, "用户不存在！"));
    }

    // 生成token值 去校验
    res.json(res._ok({userinfo},{ msg:"获取用户信息成功！"}));
});

module.exports = router;