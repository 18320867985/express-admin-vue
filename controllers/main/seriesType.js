const mainModel = require("../../models/main");
const resData = require("../../libs/resData");
const jwt = require("../../libs/jwt");

// get all list
async function getAll ()
{
    let list = await mainModel.SeriesType.find();
    return resData.ok(list);
}

/*** CRUD  ***/

// unique
async function unique (val, id)
{
    let obj = await mainModel.SeriesType.findOne({name: val});
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
async function uniqueVid (val, id)
{
    let obj = await mainModel.SeriesType.findOne({vname: val});
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
async function getData (pageIndex = 1, pageSize = 10, search = {})
{
    let query = {
        name: new RegExp(search.name, "i"),
        // createDate: {
        //     $gte: search.createDateStart ? new Date(search.createDateStart) : new Date("1970-1-1"),
        //     $lte: search.createDateEnd ? new Date(search.createDateEnd) : new Date("2999-1-1"),
        // }
    };

   
    let pageCount = await mainModel.SeriesType.countDocuments(query);
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

    let list = await mainModel.SeriesType.find(query).skip(index2).limit(pageSize);

    return resData.ok(list, {
        pageIndex,
        pageSize,
        pageCount,
    });
}

// dtl
async function getDataDtl (ids = [])
{
    let list = await mainModel.SeriesType.find({
        _id: {
            $in: ids
        }
    });

    return resData.ok(list);
}

//  delete
async function deleteData (ids = [])
{
    let obj = await mainModel.SeriesType.deleteMany({
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
    let SeriesType = new mainModel.SeriesType(obj);
    let isError = SeriesType.validateSync();
    if (isError)
    {
        res.json(resData.err(null, isError));
        return;
    }

    var createObj = await mainModel.SeriesType.create(SeriesType)
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
    let vname = obj.vname;
    let order = obj.order;

    let v = await mainModel.SeriesType.findByIdAndUpdate(_id, {$set: {name, vname, order}}, {new: true});
    if (!v)
    {
        return resData.err("修改失败");
    } else
    {
        return resData.ok(v);
    }

}

module.exports = {
    getAll,
    unique,
    uniqueVid,
    getData,
    getDataDtl,
    deleteData,
    postData,
    putData,


}