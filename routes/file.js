
var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
var formidable = require("formidable"); //上传文件

router.get("/", (req, res) =>
{
    res.render("admin/file.html");
});

router.post("/", (req, res) =>
{
    try
    {
        let _url = "./public/upload";   // 相对路径
        if (!fs.existsSync(path.resolve(_url)))
        {
            fs.mkdirSync(path.resolve(_url));
        }
        let form = new formidable.IncomingForm();  
        form.keepExtensions = true;
        form.uploadDir = "./public/upload"; // 相对路径
        form.multiples = true;
        form.parse(req, (err, fileds, files) =>
        {
            // 写入数据库
            if (err)
            {
                res.json(res._err(err));
                return;
                //throw err;
            }

            var _path = files.file.path;
            // var p = path.dirname(_path);
           // var extname = path.extname(_path);
            var basename = path.basename(_path);
            let url ="/public/upload/" + basename;
            res.json(res._ok(url));

        });

    } catch (error)
    {
        res.json(res._err(error));
        return;
    }
});

module.exports = router;