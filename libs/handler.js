
let resData = require("./resData");
let handler = {

    apply (target, ctx, args)
    {
        let authInfo = args[ 0 ] && args[ 0 ].authInfo;
        if (!authInfo) {return new Error("没有实例authInfo对象");}
        console.log(" IProxy success,function name:", target.name);
        if (authInfo.roleId && authInfo.roleId.vid === 2) 
        {
            //todo...  
        } else
        {
            return resData.notAuth(null, "没有操作权限");
        }

        return Reflect.apply(...arguments);
    }
}

module.exports = handler