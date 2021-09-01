// 用户类型
const orm = require("./_mongoose");

var schema = new orm.mongoose.Schema({
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

var UserRole = orm.db.model("UserRole", schema);

module.exports = UserRole;