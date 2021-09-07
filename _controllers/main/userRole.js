const mainModel = require("../../_models/main");
const resData = require("../../libs/resData");
const jwt = require("../../libs/jwt");

// get all list
async function getAll ()
{
    let list = await mainModel.UserRole.find();
    return resData.ok(list);
}

/*** CRUD  ***/

// unique
async function unique (req)
{
    let query = req.query || {};
    let val = query.value || "";
    let id = query.id || "";

    let obj = await mainModel.UserRole.findOne({name: val});
    if (obj)
    {
        if (obj._id.toString() === id)
        {
            return true;
        }
        return false;

    } else
    {
        return true;
    }
}
// unique
async function uniqueVid (req)
{
    let query = req.query || {};
    let val = query.value || "";
    let id = query.id || "";

    let obj = await mainModel.UserRole.findOne({vid: val});
    if (obj)
    {
        if (obj._id.toString() === id)
        {
            return true;
        }
        return false;

    } else
    {
        return true;
    }
}

// get list
async function getData (req)
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

    let pageCount = await mainModel.UserRole.countDocuments(query);
    if (pageCount <= 0)
    {
        // not data
        return resData.ok([], {
            pageIndex, //	当前页
            pageSize, //  每页条数
            pageCount, //  总条数
        });
    }

    let maxIndex = Math.ceil(pageCount / pageSize) || 0;
    pageIndex = pageIndex > maxIndex ? maxIndex : pageIndex;
    let index2 = (pageIndex - 1) * pageSize;

    let list = await mainModel.UserRole.find(query, {pwd: 0}).populate("roleId", "name code").skip(index2).limit(pageSize);

    return resData.ok(list, {
        pageIndex,
        pageSize,
        pageCount,
    });
}

// dtl
async function getDataDtl (req)
{
    let ids = req.params.ids || '';
    ids = ids.split(',');

    let list = await mainModel.UserRole.find({
        _id: {
            $in: ids
        }
    });

    return resData.ok(list);
}

//  delete
async function deleteData (req)
{
    let ids = req.params.ids || '';
    ids = ids.split(',');

    let obj = await mainModel.UserRole.deleteMany({
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
async function postData (req)
{
    let params = req.body || {};
    var obj = {
        name: params.name,
        vid: params.vid,
        order: params.order || 0,
    }
    let UserRole = new mainModel.UserRole(obj);
    let isError = UserRole.validateSync();
    if (isError)
    {
        return resData.err(null, isError);
    }

    var createObj = await mainModel.UserRole.create(UserRole)
    if (!createObj)
    {
        return resData.err("添加失败");
    }
    return resData.ok(createObj);

}

// put
async function putData (req)
{
    let obj = req.body || {};
    let _id = obj._id || "";
    let name = obj.name;
    let vid = obj.vid;
    let order = obj.order;

    let v = await mainModel.UserRole.findByIdAndUpdate(_id, {$set: {name, vid, order}}, {new: true});
    if (!v)
    {
        return resData.err("修改失败");
    } else
    {
        return resData.ok(v);
    }

}

let IProxy = require("../../libs/IProxy");
module.exports = IProxy({
    getAll,
    unique,
    uniqueVid,
    getData,
    getDataDtl,
    deleteData,
    postData,
    putData,
});