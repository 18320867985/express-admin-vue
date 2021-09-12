const mainModel = require("../../_models/main");
const jwt = require("../../libs/jwt");
const cpy = require("../../libs/crypto");
const resData = require("../../libs/resData");
let IProxy = require("../../libs/IProxy");

class User extends IProxy
{
    constructor (fnNams = [])
    {
        super(fnNams);
    }

    // 登录
    async loginData (params)
    {
        let userinfo = await mainModel.User.findOne(params, {pwd: 0, createDate: 0}).populate("roleId", "name vid");
        if (!userinfo)
        {
            return resData.err(null, "用户名与密码不匹配！");
        }

        // 生成token值 去校验
        let token = jwt.sign(userinfo);
        let decode = jwt.decode(token);
        return resData.ok({token, userinfo}, {msg: "登录成功！", exp: decode.exp, iat: decode.iat});
    }

    // 初始加载数据
    async initData (token)
    {
        let decode = jwt.decode(token);
        let userinfo = await mainModel.User.findById(decode.data._id, {pwd: 0, createDate: 0}).populate("roleId", "name vid");
        if (!userinfo)
        {
            return resData.err(null, "用户不存在！");
        }

        // 生成token值 去校验
        return resData.ok({userinfo}, {msg: "获取用户信息成功！"});
    }

    // unique
    async unique (req)
    {
        let query = req.query || {};
        let val = query.value || "";
        let id = query.id || "";

        let obj = await mainModel.User.findOne({name: val});
        if (obj)
        {
            if (obj._id.toString() === id)
            {
                return true;
            }
            else
            {
                return false;
            }

        } else
        {
            return true;
        }
    }

    // get list
    async getData (req)
    {
        // paging start
        let pageIndex = Number(req.params.pageIndex);
        let pageSize = Number(req.params.pageSize);
        let search = req.query;

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

    // dtl
    async getDataDtl (req)
    {
        let ids = req.params.ids || '';
        ids = ids.split(',');

        let list = await mainModel.User.find({
            _id: {
                $in: ids
            }
        }).populate("roleId", "name code");

        return resData.ok(list);
    }

    //  delete
    async deleteData (req)
    {
        let ids = req.params.ids || '';
        ids = ids.split(',');

        let user_id = req.authInfo._id.toString();
        if (ids.includes(user_id))
        {
            return resData.err(null, "当前是活动用户不能删除");
        }

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

    // post
    async postData (req)
    {
        let params = req.body || {};
        var obj = {
            name: params.name,
            pwd: cpy.md5(params.pwd),
            email: params.email,
            roleId: params.roleId,
            phone: params.phone
        }
        let user = new mainModel.User(obj);
        let isError = user.validateSync();
        if (isError)
        {
            res.json(resData.err(null, isError));
            return;
        }

        var count = await mainModel.User.countDocuments({name: user.name});
        if (count > 0)
        {
            return resData.err("用户名已存在！");
        };

        var createObj = await mainModel.User.create(user)
        if (!createObj)
        {
            return resData.err("添加失败");
        }
        return resData.ok(createObj);

    }

    // put
    async putData (req)
    {
        let obj = req.body || {};
        let _id = obj._id || "";
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

        let v = await mainModel.User.findByIdAndUpdate(_id, {$set: {roleId, phone, email}}, {new: true});
        if (!v)
        {
            return resData.err("修改失败");
        } else
        {
            return resData.ok(v);
        }

    }

    // editPwd
    async editPwd (req)
    {
        let obj = req.body || {};
        let _id=obj._id;
        let oldPwd =cpy.md5(obj.oldPwd);
        let pwd =cpy.md5(obj.newPwd);
        let user=await mainModel.User.findOne({_id,pwd:oldPwd});
        if(!user)
        {
          return  resData.err(null,"原密码有误！")
        }

        let v=await mainModel.User.findByIdAndUpdate(_id,{$set:{pwd}},{new:true});
        if (!v)
        {
            return resData.err("密码修改失败");
        } else
        {
            return resData.ok(v);
        }

    }

}

module.exports = new User();