 let router = require('./_router');

/* GET home page. */
router.get('/', async function (req, res) {
 res.redirect("admin/index");
});

require("./login");
require("./reg");

module.exports = router;
