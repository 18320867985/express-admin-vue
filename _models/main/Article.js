
// 文章
const orm = require("./_mongoose");

var schema = new orm.mongoose.Schema({
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
    content: {
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

});

var Article = orm.db.model("Article", schema);

module.exports = Article;