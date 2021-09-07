const router = require("./_router");
const mainCtrl = require("../../_controllers/main");


router.get("/userRole/all", async (req, res) =>
{
    let data = await mainCtrl.userRole.getAll(req);
    return res.json(data);
});

// unique
router.get("/userRole/data-unique", async (req, res) =>
{
    let data = await mainCtrl.userRole.unique(req);
    res.json(data)
});

// unique
router.get("/userRole/data-unique-vid", async (req, res) =>
{
    let data = await mainCtrl.userRole.uniqueVid(req);
    res.json(data)
});
// get list
router.get("/userRole/data/:pageIndex/:pageSize", async (req, res) =>
{
    let data = await mainCtrl.userRole.getData(req);
    res.json(data);

});

// get dtl
router.get("/userRole/data-dtl/:ids", async (req, res) =>
{
    let data = await mainCtrl.userRole.getDataDtl(req);
    res.json(data);

});

// delete
router.delete("/userRole/data/:ids", async (req, res) =>
{

    let data = await mainCtrl.userRole.deleteData(req);
    res.json(data);

});

//  post
router.post("/userRole/data", async (req, res) =>
{
    let data = await mainCtrl.userRole.postData(req);
    res.json(data);
});

// put
router.put("/userRole/data", async (req, res) =>
{
    let data = await mainCtrl.userRole.putData(req)
    res.json(data);

});


module.exports = router;