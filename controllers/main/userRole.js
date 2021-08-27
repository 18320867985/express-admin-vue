const mainModel = require("../../models/main");
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
async function unique (val)
{
    let count = await mainModel.UserRole.countDocuments({name: val});
    if (count > 0)
    {
        return false;
    } else
    {
        return true;
    }
}
// unique
async function uniqueVid (val)
{
    let count = await mainModel.UserRole.countDocuments({vid: val});
    if (count > 0)
    {
        return false;
    } else
    {
        return true;
    }
}

// get list
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
async function getDataDtl (ids = [])
{
    let list = await mainModel.UserRole.find({
        _id: {
            $in: ids
        }
    });

    return resData.ok(list);
}

//  delete
async function deleteData (ids = [])
{
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
async function postData (obj)
{
    let UserRole = new mainModel.UserRole(obj);
    let isError = UserRole.validateSync();
    if (isError)
    {
        res.json(resData.err(null, isError));
        return;
    }

    var createObj = await mainModel.UserRole.create(UserRole)
    if (!createObj)
    {
        return resData.err("添加失败");
    }
    return resData.ok(createObj);

}

// put
async function putData (obj)
{
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

module.exports= {
    getAll,
    unique,
    uniqueVid,
    getData,
    getDataDtl,
    deleteData,
    postData,
    putData,
  
   
}