
let Ihandle = require("./IHandler");

class IProxy
{
    constructor (childObj, childFnNames=[])
    {
        // 默认继承接口的函数名称
        this.fnNames = [ "postData", "deleteData", "putData" ];
        this.fnNames.push(...childFnNames);
        Object.getOwnPropertyNames(childObj).forEach(key =>
        {
            if (typeof childObj[ key ] === "function" && this.fnNames.includes(key))
            {
                let proxy = new Proxy(childObj[ key ], Ihandle);
                childObj[ key ] = proxy;
            }

        })
    }
}

module.exports = IProxy;