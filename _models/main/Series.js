
// 系列
const orm = require("./_mongoose");

let childSchema = new orm.mongoose.Schema({

    ttl: {
        type: String,
        default: ""
    },
    url: {
        type: String,
        default: ""
    },
    src: {
        type: String,
        default: ""
    },
    order: {
        type: Number,
        default: 0
    },
    enabled:{
        type:Boolean,
        default:true
    }
});

let schema = new orm.mongoose.Schema({
    name: {
        type: String,
        default:"",
        index: true,
    },
    vname:{
        type:String,
        default:""
    },
    order: {
        type: Number,
        default: 0
    },
    createDate: {
        type: Date,
        default: Date.now
    },

    seriesType_id: {
        type: orm.mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "SeriesType"
    },
    imgs: [childSchema]
});

let Series = orm.db.model("Series", schema);

module.exports = Series;