var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();

app.use(logger('dev'));
app.use(express.json());                           // for parsing application/json
app.use(express.urlencoded({extended: true}));    // for parsing application/x-www-form-urlencoded

app.use("/public", express.static(path.join(__dirname, 'public')));

// 跨域CORS
app.use(function (req, res, next)
{
    let reqOrigin = req.header("origin");
    if (reqOrigin !== undefined)
    {
        res.header("Access-Control-Allow-Origin", "*");   // * 表示所有站点可以访问,单个指定例如：http://localhost:8888
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,Access-Token");
    }
    next();
});

// ueditor
var ueditor = require("ueditor");
app.use("/ueditor/ue", ueditor("public", function (req, res, next)

{
    //客户端上传文件设置
    console.log("conection")
      //客户端上传文件设置
    var imgDir = '/ueditor/upload-img/';
    var ActionType = req.query.action;
    if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo')
    {
        var file_url = imgDir;//默认图片上传地址
        /*其他上传格式的地址*/
        if (ActionType === 'uploadfile')
        {
            file_url = '/file/ueditor/'; //附件
        }
        if (ActionType === 'uploadvideo')
        {
            file_url = '/video/ueditor/'; //视频
        }
        res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.setHeader('Content-Type', 'text/html');
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage')
    {
        var dir_url = imgDir;
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else
    {
        // console.log('config.json')
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));


// token 验证
let jwt = require("./libs/jwt");
let resData=require("./libs/resData");
// app.use((req, res, next) =>
// {
//     if (jwt.notSignTokenUrlList.indexOf(req.url) === -1)
//     {    
//         //[ 'Access-Token' ] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
//         let token = req.headers[ 'access-token' ];  // 接受必须是小写
//         jwt.verify(token, function (err, decorded)
//         {
//             if (err)
//             {
//                 res.json(resData.notToken(null,{token:"无效的token,请登录去获取token"}));
//             }else{
//                 next();
//             }
//         })

//     } else
//     {
//         next();
//     }

// });

// route 路由
let indexRouter = require('./_routers/index');
let adminRouter = require('./_routers/main/index');
let fileRouter = require('./_routers/file/index');
app.use('/', indexRouter);
app.use('/main', adminRouter);
app.use('/file', fileRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found API');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json( {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json( {
        message: err.message,
        error: {}
    });
});

module.exports = app;
