
const handler = require("./handler");

class IProxy
{
    constructor (childFnNames = [])
    {
        if (new.target === IProxy) 
        {
            throw new Error('本接口类不能实例化,必须继承才可以用');
        }
        let childObj = new.target.prototype;

        this.fnNames = [
            {
                fnName: "postData", //函数名称
                desc: "添加"        //描述
            },
            {
                fnName: "putData",
                desc: "修改"
            },
            {
                fnName: "deleteData",
                desc: "删除"
            }
        ];

        this.fnNames.push(...childFnNames);
        Object.getOwnPropertyNames(childObj).forEach(key =>
        {
            if (typeof childObj[ key ] === "function" && this.fnNames.findIndex(item => item.fnName.trim() === key) !== -1)
            {
                let proxy = new Proxy(childObj[ key ], handler);
                childObj[ key ] = proxy;
            }

        });
    }
}

module.exports = IProxy;