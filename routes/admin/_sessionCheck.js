
const router = require("./_router");

router.use("/", (req, res, next) =>
{
  if (req.session.login && req.session.login.isLogin === true)
  {
    next();
  }
  else
  {
    res.redirect("/login");
  }

});

module.exports = router;
