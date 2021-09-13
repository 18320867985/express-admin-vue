
// 系列类型
const orm = require("./_mongoose");

let schema = new orm.mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    vname: {
        type: String,
        index: true,
        unique: true
    },
    createDate: {
        type: Date, default: Date.now
    },
    order: {
        type: Number,
        default: 0
    }

});

let SeriesType = orm.db.model("SeriesType", schema);

module.exports = SeriesType;