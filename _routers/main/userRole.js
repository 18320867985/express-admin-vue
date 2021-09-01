const router = require("./router");
const mainCtrl = require("../../_controllers/main");

router.get("/userRole/all", async (req, res) =>
{
    let data = await mainCtrl.userRole.getAll();
    return res.json(data);
});

// unique
router.get("/userRole/data-unique", async (req, res) =>
{
    let query=req.query||{};
    let value = query.value || "";
    let id = query.id || "";
    let data = await mainCtrl.userRole.unique(value,id);
    res.json(data)
});

// unique
router.get("/userRole/data-unique-vid", async (req, res) =>
{
    let query=req.query||{};
    let value = query.value || "";
    let id = query.id || "";
    let data = await mainCtrl.userRole.uniqueVid(value,id);
    res.json(data)
});
// get list
router.get("/userRole/data/:pageIndex/:pageSize", async (req, res) =>
{
    // paging start
    let pageIndex = Number(req.params.pageIndex);
    let pageSize = Number(req.params.pageSize);
    let data = await mainCtrl.userRole.getData(pageIndex, pageSize, req.query);
    res.json(data);

});

// get dtl
router.get("/userRole/data-dtl/:ids", async (req, res) =>
{
    let ids = req.params.ids || '';
    ids = ids.split(',');
    let data = await mainCtrl.userRole.getDataDtl(ids);
    res.json(data);

});

// delete
router.delete("/userRole/data/:ids", async (req, res) =>
{
    let ids = req.params.ids || '';
    ids = ids.split(',');
    let data = await mainCtrl.userRole.deleteData(ids);
    res.json(data);

});

//  post
router.post("/userRole/data", async (req, res) =>
{
    let obj = req.body || {};
    var userRole = {
        name: obj.name,
        vid: obj.vid,
        order:obj.order||0,
    }
    let data = await mainCtrl.userRole.postData(userRole);
    res.json(data);
});

// put
router.put("/userRole/data", async (req, res) =>
{
    let data = await mainCtrl.userRole.putData(req.body || {})
    res.json(data);

});


module.exports = router;