const mainModel = require("../../models/main");
const resData = require("../../libs/resData");

// 返回所有的
async function getAll ()
{
    let list = await mainModel.UserRole.find();
    return resData.ok(list);
}

module.exports= {
    getAll
}