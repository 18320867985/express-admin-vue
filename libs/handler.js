
const resData = require("./resData");
const mainCtrl = require("../_controllers/main");

let handler = {

    apply (target, ctx, args)
    {
        let req= args[ 0 ] && args[ 0 ];
        let authInfo = req.authInfo;
        if (!authInfo) {return new Error("没有实例的authInfo对象");}

        let log = {
            docName: ctx.constructor.name,
            fnName: target.name,
            desc: ctx.fnNames.find(item => item.fnName.trim() === target.name).desc,
            user_id: authInfo._id,   
        }

        console.log("IProxy success function name:", target.name);
        if (authInfo.roleId && authInfo.roleId.vid === 1) 
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