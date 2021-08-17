
// 系列类型
const orm = require("./_mongoose");

var schema = new orm.mongoose.Schema({
    name:{
        type:String,
        default:""
    },
    code:{type:String,
        index:true,
        unique:true  },
    createdt:{
        type:Date,default:Date.now
    },
    order:{
        type:Number,
        default:1
    }

});

var SeriesType =orm.db.model("SeriesType", schema);

module.exports = SeriesType;