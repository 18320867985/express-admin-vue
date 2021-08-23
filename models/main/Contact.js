
// 联系我们
const orm = require("./_mongoose");

let schema = new orm.mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    code: {
        type: String,
        required: true,
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
    createdt: {
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
    tel: {
        type: String,
        default: ""
    }
   
});


let Contact = orm.db.model("Contact", schema);

module.exports = Contact;