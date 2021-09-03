const router = require("./_router");
const mainCtrl = require("../../_controllers/main");

// unique
router.get("/article/data-unique", async (req, res) =>
{
    let query=req.query||{};
    let value = query.value || "";
    let id = query.id || "";
    let data = await mainCtrl.article.unique(value,id);
    res.json(data)
});

// unique
router.get("/article/data-unique-vid", async (req, res) =>
{
    let query=req.query||{};
    let value = query.value || "";
    let id = query.id || "";
    let data = await mainCtrl.article.uniqueVid(value,id);
    res.json(data)
});

// get list
router.get("/article/data/:pageIndex/:pageSize", async (req, res) =>
{
    // paging start
    let pageIndex = Number(req.params.pageIndex);
    let pageSize = Number(req.params.pageSize);
    let data = await mainCtrl.article.getData(pageIndex, pageSize, req.query);
    res.json(data);

});

// get dtl
router.get("/article/data-dtl/:ids", async (req, res) =>
{
    let ids = req.params.ids || '';
    ids = ids.split(',');
    let data = await mainCtrl.article.getDataDtl(ids);
    res.json(data);

});

// delete
router.delete("/article/data/:ids", async (req, res) =>
{
    let ids = req.params.ids || '';
    ids = ids.split(',');
    let data = await mainCtrl.article.deleteData(ids);
    res.json(data);

});

//  post
router.post("/article/data", async (req, res) =>
{
    let obj = req.body || {};
    let data = await mainCtrl.article.postData(obj);
    res.json(data);
});

// put
router.put("/article/data", async (req, res) =>
{
    let data = await mainCtrl.article.putData(req.body || {})
    res.json(data);

});


module.exports = router;