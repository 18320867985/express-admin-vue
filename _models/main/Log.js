
// 日志
const orm = require("./_mongoose");

let schema = new orm.mongoose.Schema({

    docName: {
        type: String,
        require: true
    },

    fnName: {
        type: String,
        require: true
    },

    user_id: {
        type: orm.mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    
    desc:{
        type: String
    },

    ip:{
        type: String
    },
    createDate: {
        type: Date,
        default: Date.now
    },

});

let Log = orm.db.model("Log", schema);

module.exports = Log;