
// 用户列表
const orm = require("./_mongoose");

var schema = new orm.mongoose.Schema({
    name: {
        type: String,
        index: true,
        unique: true
    },
    pwd: {
        type: String,
        minlength: [ 8, "最小长度为8位" ]
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    emall: {type: String},
    roleId: {
        type: orm.mongoose.Schema.Types.ObjectId,
        ref: "UserRole"
    }
});

var User = orm.db.model("User", schema);

module.exports = User;