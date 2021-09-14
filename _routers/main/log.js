
const router = require("./_router");
const mainCtrl = require("../../_controllers/main");

// get list
router.get("/log/data/:pageIndex/:pageSize", async (req, res) =>
{
    let data = await mainCtrl.log.getData(req);
    res.json(data);
});

// get dtl
router.get("/log/data-dtl/:ids", async (req, res) =>
{
    let data = await mainCtrl.log.getDataDtl(req);
    res.json(data);

});

// delete
router.delete("/log/data/:ids", async (req, res) =>
{
    let data = await mainCtrl.log.deleteData(req);
    res.json(data);

});

//  post
router.post("/log/data", async (req, res) =>
{
    let data = await mainCtrl.log.postData(req);
    res.json(data);
});





module.exports = router;