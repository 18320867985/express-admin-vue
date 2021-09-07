const router = require("./_router");
const mainCtrl = require("../../_controllers/main");

router.get("/seriesType/all", async (req, res) =>
{
    let data = await mainCtrl.seriesType.getAll(req);
    return res.json(data);
});

// unique
router.get("/seriesType/data-unique", async (req, res) =>
{
    let data = await mainCtrl.seriesType.unique(req);
    res.json(data)
});

// unique
router.get("/seriesType/data-unique-vid", async (req, res) =>
{
    let data = await mainCtrl.seriesType.uniqueVid(req);
    res.json(data)
});

// get list
router.get("/seriesType/data/:pageIndex/:pageSize", async (req, res) =>
{
    let data = await mainCtrl.seriesType.getData(req);
    res.json(data);
});

// get dtl
router.get("/seriesType/data-dtl/:ids", async (req, res) =>
{
    let data = await mainCtrl.seriesType.getDataDtl(req);
    res.json(data);
});

// delete
router.delete("/seriesType/data/:ids", async (req, res) =>
{
    let data = await mainCtrl.seriesType.deleteData(req);
    res.json(data);
});

//  post
router.post("/seriesType/data", async (req, res) =>
{
    let data = await mainCtrl.seriesType.postData(req);
    res.json(data);
});

// put
router.put("/seriesType/data", async (req, res) =>
{
    let data = await mainCtrl.seriesType.putData(req)
    res.json(data);
});

module.exports = router;