const router = require("./_router");
const mainCtrl = require("../../_controllers/main");

// unique
router.get("/svcnet/data-unique", async (req, res) =>
{
   
    let data = await mainCtrl.svcnet.unique(req);
    res.json(data)
});

// unique
router.get("/svcnet/data-unique-vid", async (req, res) =>
{
    let data = await mainCtrl.svcnet.uniqueVid(req);
    res.json(data)
});

// get list
router.get("/svcnet/data/:pageIndex/:pageSize", async (req, res) =>
{
    let data = await mainCtrl.svcnet.getData(req);
    res.json(data);

});

// get dtl
router.get("/svcnet/data-dtl/:ids", async (req, res) =>
{
    let data = await mainCtrl.svcnet.getDataDtl(req);
    res.json(data);

});

// delete
router.delete("/svcnet/data/:ids", async (req, res) =>
{
    let data = await mainCtrl.svcnet.deleteData(req);
    res.json(data);

});

//  post
router.post("/svcnet/data", async (req, res) =>
{
    let data = await mainCtrl.svcnet.postData(req);
    res.json(data);
});

// put
router.put("/svcnet/data", async (req, res) =>
{
    let data = await mainCtrl.svcnet.putData(req)
    res.json(data);

});


module.exports = router;