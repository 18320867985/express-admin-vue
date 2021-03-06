
// 服务网点
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
        
    },
    vname:{
        type:String,
        default:""
    },
    desc: {
        type: String,
        default: ""
    },
    order: {
        type: Number,
        default: 0
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    addr:{
        type:String,
        default:""
    },
    phone:{
        type:String,
        default:""
    },
    imgs:[childSchema]

   
});

let Svcnet = orm.db.model("Svcnet", schema);

module.exports = Svcnet;