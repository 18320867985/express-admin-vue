// 用户类型
const  orm= require("./_mongoose");

var schema = new orm.mongoose.Schema({
    name:{type:String},
    code:{type:Number,
        index:true,
        unique:true  },
    createDate:{
        type:Date,default:Date.now
    },
    order:{
        type:Number,
        default:1
    }

});

var UserRole =orm.db.model("UserRole", schema);

module.exports = UserRole;