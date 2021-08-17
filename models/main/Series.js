
// 系列
const orm = require("./_mongoose");

var childSchema = new orm.mongoose.Schema({
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
        default: 1
    }
});

var schema = new orm.mongoose.Schema({
    name: {
        type: String,
        default:"",
        index: true,
    },
    code:{
        type:String,
        required:true,
        default:""
    },
    desc: {
        type: String,
        default: ""
    },
    order: {
        type: Number,
        default: 1
    },
    createdt: {
        type: Date,
        default: Date.now
    },

    seriestypeId: {
        type: orm.mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "SeriesType"
    },
    imgs: [childSchema]
});

var Series = orm.db.model("Series", schema);

module.exports = Series;