const mainModel = require("../../_models/main");
const resData = require("../../libs/resData");
let IProxy = require("../../libs/IProxy");

class Contact extends IProxy
{
    constructor (fnNams = [])
    {
        super(fnNams);
    }

    // unique
    async unique (req)
    {
        let query = req.query || {};
        let val = query.value || "";
        let id = query.id || "";

        let obj = await mainModel.Contact.findOne({name: val});
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
    async uniqueVid (req)
    {

        let query = req.query || {};
        let val = query.value || "";
        let id = query.id || "";

        let obj = await mainModel.Contact.findOne({vname: val});
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

        let pageCount = await mainModel.Contact.countDocuments(query);
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

        let list = await mainModel.Contact.find(query).skip(index2).limit(pageSize);

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

        let list = await mainModel.Contact.find({
            _id: {
                $in: ids
            }
        });

        return resData.ok(list);
    }

    //  delete
    async deleteData (req)
    {
        let ids = req.params.ids || '';
        ids = ids.split(',');
        let obj = await mainModel.Contact.deleteMany({
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
            vname: params.vname,
            order: params.order || 0,
            x: params.x,
            y: params.y,
            addr: params.addr,
            phone: params.phone,
            // imgs:params.imgs,
        }

        let Contact = new mainModel.Contact(obj);
        let isError = Contact.validateSync();
        if (isError)
        {
            return resData.err(null, isError);
        }

        var createObj = await mainModel.Contact.create(Contact)
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
        let name = obj.name;
        let vname = obj.vname;
        let order = obj.order;
        let phone = obj.phone;
        let x = obj.x;
        let y = obj.y;

        let v = await mainModel.Contact.findByIdAndUpdate(_id, {$set: {name, vname, order, phone, x, y}}, {new: true});
        if (!v)
        {
            return resData.err("修改失败");
        } else
        {
            return resData.ok(v);
        }

    }

}

module.exports = new Contact();