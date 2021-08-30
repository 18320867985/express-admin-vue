const router = require("./_router");
const mainCtrl = require("../../controllers/main");

// unique
router.get("/rotation/data-unique", async (req, res) =>
{
    let query=req.query||{};
    let value = query.value || "";
    let id = query.id || "";
    let data = await mainCtrl.rotation.unique(value,id);
    res.json(data)
});

// unique
router.get("/rotation/data-unique-vid", async (req, res) =>
{
    let query=req.query||{};
    let value = query.value || "";
    let id = query.id || "";
    let data = await mainCtrl.rotation.uniqueVid(value,id);
    res.json(data)
});

// get list
router.get("/rotation/data/:pageIndex/:pageSize", async (req, res) =>
{
    // paging start
    let pageIndex = Number(req.params.pageIndex);
    let pageSize = Number(req.params.pageSize);
    let data = await mainCtrl.rotation.getData(pageIndex, pageSize, req.query);
    res.json(data);

});

// get dtl
router.get("/rotation/data-dtl/:ids", async (req, res) =>
{
    let ids = req.params.ids || '';
    ids = ids.split(',');
    let data = await mainCtrl.rotation.getDataDtl(ids);
    res.json(data);

});

// delete
router.delete("/rotation/data/:ids", async (req, res) =>
{
    let ids = req.params.ids || '';
    ids = ids.split(',');
    let data = await mainCtrl.rotation.deleteData(ids);
    res.json(data);

});

//  post
router.post("/rotation/data", async (req, res) =>
{
    let obj = req.body || {};
    var rotation = {
        name: obj.name,
        vname: obj.vname,
        order:obj.order||0,
    }
    let data = await mainCtrl.rotation.postData(rotation);
    res.json(data);
});

// put
router.put("/rotation/data", async (req, res) =>
{
    let data = await mainCtrl.rotation.putData(req.body || {})
    res.json(data);

});


module.exports = router;