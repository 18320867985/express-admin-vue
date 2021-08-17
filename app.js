
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var app = express();

app.use(logger('dev'));
app.use(express.json());                           // for parsing application/json
app.use(express.urlencoded({extended: true}));    // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

// session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: true
    }
}));

app.use("/public", express.static(path.join(__dirname, 'public')));

var isdev = true;
// 配合前端打包工具使用 前端打包文件夹html
let ueditorDir, ueditorUpload, htmlStatic, ejsDir;

// dev
if (isdev)
{
    ueditorUpload = path.join(__dirname, 'html/src');
    ueditorDir = path.join(__dirname, 'html/src/ueditor');
    htmlStatic = path.join(__dirname, 'html/src/static');
    ejsDir = path.join(__dirname, 'html/src/views');
} else
{
    // release
    ueditorUpload = path.join(__dirname, 'html/dist');
    ueditorDir = path.join(__dirname, 'html/dist/ueditor');
    htmlStatic = path.join(__dirname, 'html/dist/static');
    ejsDir = path.join(__dirname, 'html/dist/views');
}

app.use("/static", express.static(htmlStatic));
app.use("/ueditor", express.static(ueditorDir));

app.set('views', path.join(ejsDir, ""));
app.set('view engine', 'html'); //   设置扩展名
app.engine("html", require("ejs").renderFile);

// 跨域CORS
app.use(function (req, res, next)
{
    let reqOrigin = req.header("origin");
    if (reqOrigin !== undefined)
    {
        res.header("Access-Control-Allow-Origin", "*");   // * 表示所有站点可以访问,单个指定例如：http://localhost:8888
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    }
    next();
});

// 处理api返回的数据格式
app.use((req, res, next) =>
{
     // error return data
     if(!res._err)
     {
        res._err = (data, desc) =>
        {
            let o = {
                status: "error",
                code: 0,
                data
            };
    
            if(desc instanceof Object)
            {
              return Object.assign(o,desc) ;
            }
    
            o.desc = desc;
            return o;
        };
    
     }
    
    // success return data
    if(!res._ok)
    {
        res._ok = (data, desc) =>
        {
            let o = {
                status: "success",
                code: 1,
                data
            };
    
            if(desc instanceof Object)
            {
              return Object.assign(o,desc) ;
            }
            
            o.desc = desc;
            return o;
        };
    
    }
       // not token return data
       if(!res._notToken)
       {
           res._notToken = (data, desc) =>
           {
               let o = {
                   status: "not token  no access 403",
                   code: 2,
                   data
               };
       
               if(desc instanceof Object)
               {
                 return Object.assign(o,desc) ;
               }
               
               o.desc = desc;
               return o;
           };
       
       }
  
    next();
});

// token 验证
// let jwt = require("./libs/jwt");
// app.use((req, res, next) =>
// {
//     if (jwt.notSignTokenUrlList.indexOf(req.url) === -1)
//     {    
//         //[ 'x-access-token' ] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
//         let token = req.headers[ 'x-access-token' ];
//         console.log("headers",req.headers)
//         console.log("headers-common",req.headers.common)
//         console.log("token",token)
//         next();
//         jwt.verify(token, function (err, decorded)
//         {
//             console.log("decorded",decorded)
//             if (err)
//             {
//                 res.json(res._notToken({token:"无效的token,请登录去获取token"},));

//             }else{
//                 next();
//             }
//         })

//     } else
//     {
//         next();
//     }

// });

// route 
let indexRouter = require('./routes/index');
let adminRouter = require('./routes/admin/index');
let file = require('./routes/file');
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/file', file);

// ueditor
var ueditor = require("ueditor");
app.use("/ueditor/ue", ueditor(ueditorUpload, function (req, res, next)
{
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

// catch 404 and forward to error handler
app.use(function (req, res, next)
{
    res.render("404.html");
});

module.exports = app;
