
const router = require("./_router");
const mainCtrl = require("../../_controllers/main");

// unique
router.get("/user/data-unique", async (req, res) =>
{
    let data = await mainCtrl.user.unique(req);
    res.json(data)
});

// get list
router.get("/user/data/:pageIndex/:pageSize", async (req, res) =>
{
    let data = await mainCtrl.user.getData(req);
    res.json(data);
});

// get dtl
router.get("/user/data-dtl/:ids", async (req, res) =>
{
    let data = await mainCtrl.user.getDataDtl(req);
    res.json(data);

});

// delete
router.delete("/user/data/:ids", async (req, res) =>
{
    let data = await mainCtrl.user.deleteData(req);
    res.json(data);

});

//  post
router.post("/user/data", async (req, res) =>
{
    let data = await mainCtrl.user.postData(req);
    res.json(data);
});

// put
router.put("/user/data", async (req, res) =>
{
   let data=await mainCtrl.user.putData(req)
    res.json(data);
   
});

// editPwd
router.put("/user/editPwd", async (req, res) =>
{
   let data=await mainCtrl.user.editPwd(req)
    res.json(data);
   
});

module.exports = router;