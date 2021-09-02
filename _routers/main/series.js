const router = require("./_router");
const mainCtrl = require("../../_controllers/main");

// unique
router.get("/series/data-unique", async (req, res) =>
{
    let query=req.query||{};
    let value = query.value || "";
    let id = query.id || "";
    let data = await mainCtrl.series.unique(value,id);
    res.json(data)
});

// unique
router.get("/series/data-unique-vid", async (req, res) =>
{
    let query=req.query||{};
    let value = query.value || "";
    let id = query.id || "";
    let data = await mainCtrl.series.uniqueVid(value,id);
    res.json(data)
});

// get list
router.get("/series/data/:pageIndex/:pageSize", async (req, res) =>
{
    // paging start
    let pageIndex = Number(req.params.pageIndex);
    let pageSize = Number(req.params.pageSize);
    let data = await mainCtrl.series.getData(pageIndex, pageSize, req.query);
    res.json(data);

});

// get dtl
router.get("/series/data-dtl/:ids", async (req, res) =>
{
    let ids = req.params.ids || '';
    ids = ids.split(',');
    let data = await mainCtrl.series.getDataDtl(ids);
    res.json(data);

});

// delete
router.delete("/series/data/:ids", async (req, res) =>
{
    let ids = req.params.ids || '';
    ids = ids.split(',');
    let data = await mainCtrl.series.deleteData(ids);
    res.json(data);

});

//  post
router.post("/series/data", async (req, res) =>
{
    let obj = req.body || {};
    let data = await mainCtrl.series.postData(obj);
    res.json(data);
});

// put
router.put("/series/data", async (req, res) =>
{
    let data = await mainCtrl.series.putData(req.body || {})
    res.json(data);

});


module.exports = router;