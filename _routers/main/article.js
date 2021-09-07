const router = require("./_router");
const mainCtrl = require("../../_controllers/main");

// unique
router.get("/article/data-unique", async (req, res) =>
{
    let data = await mainCtrl.article.unique(req);
    res.json(data)
});

// unique
router.get("/article/data-unique-vid", async (req, res) =>
{
    let data = await mainCtrl.article.uniqueVid(req);
    res.json(data)
});

// get list
router.get("/article/data/:pageIndex/:pageSize", async (req, res) =>
{
    let data = await mainCtrl.article.getData(req);
    res.json(data);
});

// get dtl
router.get("/article/data-dtl/:ids", async (req, res) =>
{
    let data = await mainCtrl.article.getDataDtl(req);
    res.json(data);
});

// delete
router.delete("/article/data/:ids", async (req, res) =>
{
    let data = await mainCtrl.article.deleteData(req);
    res.json(data);
});

//  post
router.post("/article/data", async (req, res) =>
{
    let data = await mainCtrl.article.postData(req);
    res.json(data);
});

// put
router.put("/article/data", async (req, res) =>
{
    let data = await mainCtrl.article.putData(req)
    res.json(data);

});


module.exports = router;