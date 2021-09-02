let router = require('./_router');
const cpy = require("../libs/crypto");
const mainCtrl = require("../_controllers/main");

router.post("/login/data", async (req, res) =>
{
    let name = req.body.user || "";
    let pwd = cpy.md5(req.body.pwd || "");
    let data= await mainCtrl.user.loginData({name:name,pwd:pwd});
    res.json(data);
   
});


module.exports = router;