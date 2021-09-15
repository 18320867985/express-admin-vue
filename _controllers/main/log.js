const mainModel = require("../../_models/main");
const resData = require("../../libs/resData");

class Log 
{
    // get list
    async getData (req)
    {
        // paging start
        let pageIndex = Number(req.params.pageIndex);
        let pageSize = Number(req.params.pageSize);
        let search = req.query;

        let query = {
            docName: new RegExp(search.docName, "i"),
            createDate: {
                $gte: search.createDateStart ? new Date(search.createDateStart) : new Date("1970-1-1"),
                $lte: search.createDateEnd ? new Date(search.createDateEnd) : new Date("2999-1-1"),
            }
        };

        let pageCount = await mainModel.Log.countDocuments(query);
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

        let list = await mainModel.Log.find(query).populate("user_id", "name").sort({createDate:-1}).skip(index2).limit(pageSize);

        return resData.ok(list, {
            pageIndex,
            pageSize,
            pageCount,
        });
    }

    // dtl
    async getDataDtl (req)
    {
        let ids = req.params.ids || '';
        ids = ids.split(',');
        let list = await mainModel.Log.find({
            _id: {
                $in: ids
            }
        }).populate("user_id", "name").sort({createDate:-1});

        return resData.ok(list);
    }

    //  delete
    async deleteData (req)
    {
        let ids = req.params.ids || '';
        ids = ids.split(',');

        let obj = await mainModel.Log.deleteMany({
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
    async postData (obj = {})
    {

        let Log = new mainModel.Log(obj);
        let isError = Log.validateSync(Log);
        if (isError)
        {
            throw new Error(isError);
        }

        var createObj = await mainModel.Log.create(Log)
        if (!createObj)
        {
            console.log("log insert fail");
        } else
        {
            console.log("log insert success");
        }
    }
}

module.exports = new Log();