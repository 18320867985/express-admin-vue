let router = require('./_router');
let mainCtrl = require("../_controllers/main");

router.get("/init/data", async (req, res) =>
{   
    let token = req.headers[ 'access-token' ]; // 接受必须是小写
    let data = await mainCtrl.user.initData(token);
    res.json(data);
});

module.exports = router;