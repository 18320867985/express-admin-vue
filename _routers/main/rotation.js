const router = require("./_router");
const mainCtrl = require("../../_controllers/main");

// unique
router.get("/rotation/data-unique", async (req, res) =>
{
    let data = await mainCtrl.rotation.unique(req);
    res.json(data)
});

// unique
router.get("/rotation/data-unique-vid", async (req, res) =>
{
    let data = await mainCtrl.rotation.uniqueVid(req);
    res.json(data)
});

// get list
router.get("/rotation/data/:pageIndex/:pageSize", async (req, res) =>
{
    let data = await mainCtrl.rotation.getData(req);
    res.json(data);
});

// get dtl
router.get("/rotation/data-dtl/:ids", async (req, res) =>
{
    let data = await mainCtrl.rotation.getDataDtl(req);
    res.json(data);

});

// delete
router.delete("/rotation/data/:ids", async (req, res) =>
{
    let data = await mainCtrl.rotation.deleteData(req);
    res.json(data);

});

//  post
router.post("/rotation/data", async (req, res) =>
{
    let data = await mainCtrl.rotation.postData(req);
    res.json(data);
});

// put
router.put("/rotation/data", async (req, res) =>
{
    let data = await mainCtrl.rotation.putData(req)
    res.json(data);

});

module.exports = router;