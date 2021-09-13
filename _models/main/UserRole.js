// 用户类型
const orm = require("./_mongoose");

let schema = new orm.mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    vid: {
        type: Number,

    },
    createDate: {
        type: Date, default: Date.now
    },
    order: {
        type: Number,
        default: 0
    }

});

let UserRole = orm.db.model("UserRole", schema);

module.exports = UserRole;