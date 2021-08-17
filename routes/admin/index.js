
const router = require("./_router");

// sessionCheck
require("./_sessionCheck");

router.get("/index", (req, res) =>
{
    res.render("admin/index", {});
});

router.get("/index/data", (req, res) =>
{
    if (req.session.login && req.session.login.isLogin)
    {
        res.json(res._ok(req.session.login.user));
        return;
    } else
    {
        res.json(res._err());
        return;
    }

});

// user
require("./user");

// userRule
require("./userRole");

// rotation
require("./rotation");

// banner
require("./banner");

// seriestype
require("./seriestype");

// series
require("./series");

// contact
require("./contact");

// svcnet
require("./svcnet");

// article
require("./article");

module.exports = router;