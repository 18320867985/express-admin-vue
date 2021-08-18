
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
    
            o.msg = desc;
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
            
            o.msg = desc;
            return o;
        };
    
    }
       // not token return data
       if(!res._notToken)
       {
           res._notToken = (data, desc) =>
           {
               let o = {
                   status: "not access token ",
                   code: 2,
                   data
               };
       
               if(desc instanceof Object)
               {
                 return Object.assign(o,desc) ;
               }
               
               o.msg = desc;
               return o;
           };
       
       }
  
    next();
});

// token 验证
let jwt = require("./libs/jwt");
app.use((req, res, next) =>
{
    if (jwt.notSignTokenUrlList.indexOf(req.url) === -1)
    {    
        //[ 'Access-Token' ] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
        let token = req.headers[ 'access-token' ];  // 接受必须是小写
        console.log("headers",req.headers)
        console.log("headers-common",req.headers.common)
        console.log("token",token)
        jwt.verify(token, function (err, decorded)
        {
            console.log("decorded",decorded)
            if (err)
            {
                res.json(res._notToken(null,{token:"无效的token,请登录去获取token"}));

            }else{
                next();
            }
        })

    } else
    {
        next();
    }

});

// route 路由
let indexRouter = require('./routes/index');
let adminRouter = require('./routes/admin/index');
let file = require('./routes/file');
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/file', file);

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
