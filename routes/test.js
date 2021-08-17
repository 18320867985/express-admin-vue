
var router = require('./_router');

router.get("/data", async (req, res) =>
{
    res.json(res._ok([ {name: "get"} ], {
        index: 0, //	当前页
        pageItem: 12, //  每页条数
        allItem: 100 //  总条数
    }));
});

router.post("/", async (req, res) =>
{
    res.json(res._ok([ {name: "post"} ], {
        index: 0, //	当前页
        pageItem: 12, //  每页条数
        allItem: 100 //  总条数
    }));

});

router.put("/", async (req, res) =>
{
    res.json(res._ok([ {name: "put"} ], {
        index: 0, //	当前页
        pageItem: 12, //  每页条数
        allItem: 100 //  总条数
    }));

});

router.delete("/", async (req, res) =>
{
    res.json(res._ok([ {name: "detele"} ], {
        index: 0, //	当前页
        pageItem: 12, //  每页条数
        allItem: 100 //  总条数
    }));

});

module.exports = router;