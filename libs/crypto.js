var crypto = require('crypto'); //加载加密文件

module.exports = {
    md5: function (v) {
        var md5 = crypto.createHash('md5');
        return md5.update(v).digest("hex");
    }
};