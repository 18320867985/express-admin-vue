
let handler = require("./handler");

class IProxy
{
    constructor (childFnNames = [])
    {
        if (new.target === IProxy) 
        {
            throw new Error('本接口类不能实例化,必须继承才可以用');
        }

        let childObj = new.target.prototype;
        this.fnNames = [ "postData", "deleteData", "putData" ]; // 默认继承接口函数的名称
        this.fnNames.push(...childFnNames);
        Object.getOwnPropertyNames(childObj).forEach(key =>
        {
            if (typeof childObj[ key ] === "function" && this.fnNames.includes(key))
            {
                let proxy = new Proxy(childObj[ key ], handler);
                childObj[ key ] = proxy;
            }

        });
    }
}

module.exports = IProxy;