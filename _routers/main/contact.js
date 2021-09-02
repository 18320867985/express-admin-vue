const router = require("./_router");
const mainCtrl = require("../../_controllers/main");

// unique
router.get("/contact/data-unique", async (req, res) =>
{
    let query=req.query||{};
    let value = query.value || "";
    let id = query.id || "";
    let data = await mainCtrl.contact.unique(value,id);
    res.json(data)
});

// unique
router.get("/contact/data-unique-vid", async (req, res) =>
{
    let query=req.query||{};
    let value = query.value || "";
    let id = query.id || "";
    let data = await mainCtrl.contact.uniqueVid(value,id);
    res.json(data)
});

// get list
router.get("/contact/data/:pageIndex/:pageSize", async (req, res) =>
{
    // paging start
    let pageIndex = Number(req.params.pageIndex);
    let pageSize = Number(req.params.pageSize);
    let data = await mainCtrl.contact.getData(pageIndex, pageSize, req.query);
    res.json(data);

});

// get dtl
router.get("/contact/data-dtl/:ids", async (req, res) =>
{
    let ids = req.params.ids || '';
    ids = ids.split(',');
    let data = await mainCtrl.contact.getDataDtl(ids);
    res.json(data);

});

// delete
router.delete("/contact/data/:ids", async (req, res) =>
{
    let ids = req.params.ids || '';
    ids = ids.split(',');
    let data = await mainCtrl.contact.deleteData(ids);
    res.json(data);

});

//  post
router.post("/contact/data", async (req, res) =>
{
    let obj = req.body || {};
    let data = await mainCtrl.contact.postData(obj);
    res.json(data);
});

// put
router.put("/contact/data", async (req, res) =>
{
    let data = await mainCtrl.contact.putData(req.body || {})
    res.json(data);

});


module.exports = router;