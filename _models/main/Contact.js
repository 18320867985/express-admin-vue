
// 联系我们
const orm = require("./_mongoose");

let schema = new orm.mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    vname: {
        type: String,
        default: ""
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
    x: {
        type: Number,
        default: 0
    },
    y: {
        type: Number,
        default: 0
    },

    addr: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    }
   
});


let Contact = orm.db.model("Contact", schema);

module.exports = Contact;