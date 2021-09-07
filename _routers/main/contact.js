const router = require("./_router");
const mainCtrl = require("../../_controllers/main");

// unique
router.get("/contact/data-unique", async (req, res) =>
{
    let data = await mainCtrl.contact.unique(req);
    res.json(data)
});

// unique
router.get("/contact/data-unique-vid", async (req, res) =>
{
    let data = await mainCtrl.contact.uniqueVid(req);
    res.json(data)
});

// get list
router.get("/contact/data/:pageIndex/:pageSize", async (req, res) =>
{
    let data = await mainCtrl.contact.getData(req);
    res.json(data);
});

// get dtl
router.get("/contact/data-dtl/:ids", async (req, res) =>
{
  
    let data = await mainCtrl.contact.getDataDtl(req);
    res.json(data);
});

// delete
router.delete("/contact/data/:ids", async (req, res) =>
{
    let data = await mainCtrl.contact.deleteData(req);
    res.json(data);
});

//  post
router.post("/contact/data", async (req, res) =>
{
    let data = await mainCtrl.contact.postData(req);
    res.json(data);
});

// put
router.put("/contact/data", async (req, res) =>
{
    let data = await mainCtrl.contact.putData(req)
    res.json(data);
});

module.exports = router;