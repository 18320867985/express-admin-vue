
// api输出结果格式对象

let resData = {

    // error return data
    err (data, desc)
    {
        let o = {
            status: "error",
            code: 0,
            data,
            msg:"错误"
        };

        if (desc instanceof Object)
        {
            return Object.assign(o, desc);
        }

        o.msg = desc;
        return o;
    },

    // success return data
    ok (data, desc)
    {
        let o = {
            status: "success",
            code: 1,
            data,
            msg:"成功"
        };

        if (desc instanceof Object)
        {
            return Object.assign(o, desc);
        }

        o.msg = desc;
        return o;
    },

    // not token return data
    notToken (data, desc) 
    {
        let o = {
            status: "not access token ",
            code: 2,
            data,
            msg: "没有访问的token",
        };

        if (desc instanceof Object)
        {
            return Object.assign(o, desc);
        }

        o.msg = desc;
        return o;
    },

    
    // not notAuth return data
    notAuth (data, desc) 
    {
        let o = {
            status: "not Authtion ",
            code: 3,
            data,
            msg:"没有操作权限"
        };

        if (desc instanceof Object)
        {
            return Object.assign(o, desc);
        }

        o.msg = desc;
        return o;
    }

}

module.exports= resData;





