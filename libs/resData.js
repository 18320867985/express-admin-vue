
// api输出结果格式对象

let resData = {

    // error return data
    err (data, desc)
    {
        let o = {
            status: "error",
            code: 0,
            data
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
            data
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
            data
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
            data
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





