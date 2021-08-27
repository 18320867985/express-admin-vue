
const router = require("./_router");
const cpy = require("../../libs/crypto");
const mainCtrl = require("../../controllers/main");

// unique
router.get("/user/data-unique/:v", async (req, res) =>
{
    let name = req.params.v || "";
    let data = await mainCtrl.user.unique(name);
    res.json(data)
});

// get list
router.get("/user/data/:pageIndex/:pageSize", async (req, res) =>
{
    // paging start
    let pageIndex = Number(req.params.pageIndex);
    let pageSize = Number(req.params.pageSize);
    let data = await mainCtrl.user.getData(pageIndex, pageSize, req.query);
    res.json(data);

});

// get dtl
router.get("/user/data-dtl/:ids", async (req, res) =>
{
    let ids = req.params.ids || '';
    ids = ids.split(',');
    let data = await mainCtrl.user.getDataDtl(ids);
    res.json(data);

});

// delete
router.delete("/user/data/:ids", async (req, res) =>
{
    let ids = req.params.ids || '';
    ids = ids.split(',');
    let data = await mainCtrl.user.deleteData(ids);
    res.json(data);

});

//  post
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

// put
router.put("/user/data", async (req, res) =>
{
   let data=await mainCtrl.user.putData(req.body||{})
    res.json(data);
   
});


module.exports = router;