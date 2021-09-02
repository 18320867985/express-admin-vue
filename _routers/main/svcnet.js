const router = require("./_router");
const mainCtrl = require("../../_controllers/main");

// unique
router.get("/svcnet/data-unique", async (req, res) =>
{
    let query=req.query||{};
    let value = query.value || "";
    let id = query.id || "";
    let data = await mainCtrl.svcnet.unique(value,id);
    res.json(data)
});

// unique
router.get("/svcnet/data-unique-vid", async (req, res) =>
{
    let query=req.query||{};
    let value = query.value || "";
    let id = query.id || "";
    let data = await mainCtrl.svcnet.uniqueVid(value,id);
    res.json(data)
});

// get list
router.get("/svcnet/data/:pageIndex/:pageSize", async (req, res) =>
{
    // paging start
    let pageIndex = Number(req.params.pageIndex);
    let pageSize = Number(req.params.pageSize);
    let data = await mainCtrl.svcnet.getData(pageIndex, pageSize, req.query);
    res.json(data);

});

// get dtl
router.get("/svcnet/data-dtl/:ids", async (req, res) =>
{
    let ids = req.params.ids || '';
    ids = ids.split(',');
    let data = await mainCtrl.svcnet.getDataDtl(ids);
    res.json(data);

});

// delete
router.delete("/svcnet/data/:ids", async (req, res) =>
{
    let ids = req.params.ids || '';
    ids = ids.split(',');
    let data = await mainCtrl.svcnet.deleteData(ids);
    res.json(data);

});

//  post
router.post("/svcnet/data", async (req, res) =>
{
    let obj = req.body || {};
    let data = await mainCtrl.svcnet.postData(obj);
    res.json(data);
});

// put
router.put("/svcnet/data", async (req, res) =>
{
    let data = await mainCtrl.svcnet.putData(req.body || {})
    res.json(data);

});


module.exports = router;