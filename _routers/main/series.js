const router = require("./_router");
const mainCtrl = require("../../_controllers/main");

// unique
router.get("/series/data-unique", async (req, res) =>
{
    let data = await mainCtrl.series.unique(req);
    res.json(data)
});

// unique
router.get("/series/data-unique-vid", async (req, res) =>
{
    let data = await mainCtrl.series.uniqueVid(req);
    res.json(data)
});

// get list
router.get("/series/data/:pageIndex/:pageSize", async (req, res) =>
{
    let data = await mainCtrl.series.getData(req);
    res.json(data);
});

// get dtl
router.get("/series/data-dtl/:ids", async (req, res) =>
{
    let data = await mainCtrl.series.getDataDtl(req);
    res.json(data);
});

// delete
router.delete("/series/data/:ids", async (req, res) =>
{
    let data = await mainCtrl.series.deleteData(req);
    res.json(data);
});

//  post
router.post("/series/data", async (req, res) =>
{
    let data = await mainCtrl.series.postData(re);
    res.json(data);
});

// put
router.put("/series/data", async (req, res) =>
{
    let data = await mainCtrl.series.putData(req)
    res.json(data);

});


module.exports = router;