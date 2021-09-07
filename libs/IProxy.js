
let Ihandle=require("./IHandle");

let fnNames = [ "postData", "deleteData", "putData" ]; // 默认继承接口的函数名称
function IProxy (obj = {}, agrs = [])
{
    fnNames.push(...agrs);
    Object.keys(obj).forEach(key =>
    {
        if (typeof obj[ key ] === "function" && fnNames.includes(key))
        {
            let proxy = new Proxy(obj[ key ], Ihandle);
            obj[ key ] = proxy;
        }

    })

    return obj;

}

module.exports = IProxy;