var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();

app.use(logger('dev'));
app.use(express.json());                           // for parsing application/json
app.use(express.urlencoded({ extended: true}));    // for parsing application/x-www-form-urlencoded

let prefix = "/api";  //路由前缀

app.use(prefix+"/public", express.static(path.join(__dirname, 'public')));

// 不去检验token的req请求路由url列表
let notSignTokenUrlList = [
    prefix + "/login",
    prefix + "/login/data",
];

// 跨域CORS
app.use(function (req, res, next) {
    let reqOrigin = req.header("origin");
    if (reqOrigin !== undefined) {
        res.header("Access-Control-Allow-Origin", "*");   // * 表示所有站点可以访问,单个指定例如：http://localhost:8888
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,Access-Token");
    }
    next();
});

// token 验证
let jwt = require("./libs/jwt");
let resData = require("./libs/resData");
app.use((req, res, next) => {
    if (!notSignTokenUrlList.includes(req.url)) {
        
        //[ 'Access-Token' ] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
        let token = req.headers['access-token'];  // 接受必须是小写
        jwt.verify(token, function (err, decorded) {
            if (err) {
                res.json(resData.notToken(null, { token: "无效的token,请登录去获取token" }));
            } else {
                let decode = jwt.decode(token);
                req.authInfo = decode.data; // 附加auth用户权限信息
                next();
            }
        })

    } else {
        next();
    }

});

// route 路由
let indexRouter = require('./_routers/index');
let adminRouter = require('./_routers/main/index');
let fileRouter = require('./_routers/file/index');

app.use(prefix + '/', indexRouter);
app.use(prefix + '/main', adminRouter);
app.use(prefix + '/file', fileRouter);

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
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

module.exports = app;
