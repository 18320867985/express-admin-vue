/*mongoose model*/
exports.orm = require("./_mongoose");

// models
exports.User = require("./User");

exports.UserRole = require("./UserRole");

exports.Rotation = require("./Rotation"); // 轮播图

exports.Banner = require("./Banner"); // 页面banner大图

exports.Series = require("./Series"); //  系列series

exports.SeriesType = require("./SeriesType"); //  系列SeriesType

exports.Contact = require("./Contact"); //  联系我们

exports.Svcnet = require("./Svcnet"); //  联系我们

exports.Article = require("./Article"); //  文章
