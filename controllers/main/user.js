const mainModel = require("../../models/main");
const jwt = require("../../libs/jwt");
const resData = require("../../libs/resData");

// 登录
async function loginData (params)
{
    let userinfo = await mainModel.User.findOne(params, {pwd: 0}).populate("roleId", "name code");
    if (!userinfo)
    {
        return resData.err(null, "用户名与密码不匹配！");
    }

    // 生成token值 去校验
    let token = jwt.sign(userinfo._id);
    let decode = jwt.decode(token);
    return resData.ok({token, userinfo}, {msg: "登录成功！", exp: decode.exp, iat: decode.iat});
}

// 初始加载数据
async function initData (token)
{
    let decode = jwt.decode(token);
    let userinfo = await mainModel.User.findById(decode.data, {pwd: 0}).populate("roleId", "name code");;
    if (!userinfo)
    {
        return resData.err(null, "用户不存在！");
    }

    // 生成token值 去校验
    return resData.ok({userinfo}, {msg: "获取用户信息成功！"});
}

// 分页
async function getData (pageIndex = 1, pageSize = 10, search = {})
{
    let query = {
        name: new RegExp(search.name, "i"),
        createDate: {
            $gte: search.createDateStart ? new Date(search.createDateStart) : new Date("1970-1-1"),
            $lte: search.createDateEnd ? new Date(search.createDateEnd) : new Date("2999-1-1"),
        }
    };

    if (search.roleId)
    {
        query[ "roleId" ] = search.roleId;
    }

    let pageCount = await mainModel.User.countDocuments(query);
    if (pageCount <= 0)
    {
        // 没有相关数据
        return resData.ok([], {
            pageIndex, //	当前页
            pageSize, //  每页条数
            pageCount, //  总条数
        });
    }

    let maxIndex = Math.ceil(pageCount / pageSize) || 0;
    pageIndex = pageIndex > maxIndex ? maxIndex : pageIndex;
    let index2 = (pageIndex - 1) * pageSize;

    let list = await mainModel.User.find(query, {pwd: 0}).populate("roleId", "name code").skip(index2).limit(pageSize);

    return resData.ok(list, {
        pageIndex, //	当前页
        pageSize, //  每页条数
        pageCount, //  总条数
    });
}

// 详情
async function getDataDtl (ids = [])
{
    let list = await mainModel.User.find({
        _id: {
            $in: ids
        }
    }).populate("roleId", "name code");
    
    return resData.ok(list);
}

// 删除
async function deleteData (ids = [])
{
    let obj = await mainModel.User.deleteMany({
        _id: {
            $in: ids
        }
    }).catch(err => { });

    if (!obj)
    {
        return resData.err();
    }
    return resData.ok();
}

// 检测是否存在
async function unique(val)
{
    let count = await mainModel.User.countDocuments({name: val});
    if (count > 0)
    {
    return false;
    } else
    {
    return true;
    }
}

// post
async function postData(obj)
{
    let user = new mainModel.User(obj);
    let isError = user.validateSync();
    if (isError)
    {
        res.json(res._err(null, isError));
        return;
    }

    var count = await mainModel.User.countDocuments({name: user.name});
    if (count > 0)
    {
        return  resData.err("用户名已存在！");
    };

    var userinfo = await mainModel.User.create(user)
    if (!userinfo)
    {
        return resData.err("添加失败");
    }
    return resData.ok(userinfo);

}

// 修改
async function putData(obj){
    let _id=obj._id||"";
    let roleId = obj.roleId;
    let phone = obj.phone;
    let email = obj.email;
    try
    {
        roleId = mainModel.orm.mongoose.Types.ObjectId(roleId).toHexString();
    } catch (error)
    {  
        return resData.err("用户类型 roleId 有误！");
    }

    let v = await mainModel.User.findByIdAndUpdate(_id, {$set: {roleId,phone,email}},{new:true});
    if (!v)
    {
        return resData.err("修改失败");
    } else
    {
      return  resData.ok(v);
    }

}


module.exports = {
    loginData,
    initData,
    getData,
    getDataDtl,
    postData,
    putData,
    deleteData,
    unique,

}