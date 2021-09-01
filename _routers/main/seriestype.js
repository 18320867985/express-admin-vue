const router = require("./router");
const mainCtrl = require("../../_controllers/main");

router.get("/seriesType/all", async (req, res) =>
{
    let data = await mainCtrl.seriesType.getAll();
    return res.json(data);
});

// unique
router.get("/seriesType/data-unique", async (req, res) =>
{
    let query=req.query||{};
    let value = query.value || "";
    let id = query.id || "";
    let data = await mainCtrl.seriesType.unique(value,id);
    res.json(data)
});

// unique
router.get("/seriesType/data-unique-vid", async (req, res) =>
{
    let query=req.query||{};
    let value = query.value || "";
    let id = query.id || "";
    let data = await mainCtrl.seriesType.uniqueVid(value,id);
    res.json(data)
});
// get list
router.get("/seriesType/data/:pageIndex/:pageSize", async (req, res) =>
{
    // paging start
    let pageIndex = Number(req.params.pageIndex);
    let pageSize = Number(req.params.pageSize);
    let data = await mainCtrl.seriesType.getData(pageIndex, pageSize, req.query);
    res.json(data);

});

// get dtl
router.get("/seriesType/data-dtl/:ids", async (req, res) =>
{
    let ids = req.params.ids || '';
    ids = ids.split(',');
    let data = await mainCtrl.seriesType.getDataDtl(ids);
    res.json(data);

});

// delete
router.delete("/seriesType/data/:ids", async (req, res) =>
{
    let ids = req.params.ids || '';
    ids = ids.split(',');
    let data = await mainCtrl.seriesType.deleteData(ids);
    res.json(data);

});

//  post
router.post("/seriesType/data", async (req, res) =>
{
    let obj = req.body || {};
    var seriesType = {
        name: obj.name,
        vname: obj.vname,
        order:obj.order||0,
    }
    let data = await mainCtrl.seriesType.postData(seriesType);
    res.json(data);
});

// put
router.put("/seriesType/data", async (req, res) =>
{
    let data = await mainCtrl.seriesType.putData(req.body || {})
    res.json(data);

});


module.exports = router;