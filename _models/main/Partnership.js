// 招商合作
const orm = require("./_mongoose");

let schema = new orm.mongoose.Schema({
    name: {
        type: String,
        default:""
    },
    vname:{
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
    createDate: {
        type: Date,
        default: Date.now
    },
   
    addr:{
        type:String,
        default:""
    },
    tel:{
        type:String,
        default:""
    }

   
});

let Partnership = orm.db.model("Partnership", schema);

module.exports = Partnership;