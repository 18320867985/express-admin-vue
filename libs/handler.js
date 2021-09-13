
const resData = require("./resData");
const mainCtrl = require("../_controllers/main");

let handler = {

    apply (target, ctx, args)
    {
        let authInfo = args[ 0 ] && args[ 0 ].authInfo;
        if (!authInfo) {return new Error("没有实例authInfo对象");}

        let log = {
            docName: ctx.constructor.name,
            fnName: target.name,
            user_id: authInfo._id
        }

        if (authInfo.roleId && authInfo.roleId.vid === 0) 
        {
            return resData.notAuth(null, "没有操作权限");
        }
        else if (authInfo.roleId && authInfo.roleId.vid === 1) 
        {
            if (target.name === "putData")
            {
                // 写入日志
                mainCtrl.log.postData(log);
                // 只有修改权限
                return Reflect.apply(...arguments);
            } else
            {
                return resData.notAuth(null, "没有操作权限");
            }
        }
        else if (authInfo.roleId && authInfo.roleId.vid === 2)
        {
            // 写入日志
            mainCtrl.log.postData(log);
            // 有完全操作权限
            return Reflect.apply(...arguments);
        }

        return resData.notAuth(null, "没有操作权限");
    }
}

module.exports = handler