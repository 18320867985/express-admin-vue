const mainModel = require("../../_models/main");
const resData = require("../../libs/resData");

/*** CRUD  ***/

// unique
async function unique (req)
{
    let query = req.query || {};
    let val = query.value || "";
    let id = query.id || "";

    let obj = await mainModel.Series.findOne({name: val});
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

    let obj = await mainModel.Series.findOne({vname: val});
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

    let pageCount = await mainModel.Series.countDocuments(query);
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

    let list = await mainModel.Series.find(query).skip(index2).limit(pageSize);

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

    let list = await mainModel.Series.find({
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

    let obj = await mainModel.Series.deleteMany({
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
        vname: params.vname,
        order: params.order || 0,
        imgs: params.imgs,
        seriesType_id: params.seriesType_id
    }

    let Series = new mainModel.Series(obj);
    let isError = Series.validateSync();
    if (isError)
    {

        return resData.err(null, isError);
    }

    var createObj = await mainModel.Series.create(Series)
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
    let vname = obj.vname;
    let order = obj.order;
    let imgs = obj.imgs;

    let v = await mainModel.Series.findByIdAndUpdate(_id, {$set: {name, vname, order, imgs}}, {new: true});
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
    unique,
    uniqueVid,
    getData,
    getDataDtl,
    deleteData,
    postData,
    putData,

});