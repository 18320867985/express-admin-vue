const mongoose = require("mongoose");
const config = require("../../libs/config");
const url=config.mainConfig.url;

let db = mongoose.createConnection(url, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true ,useUnifiedTopology:true});

db.on("open", function(err, data) {
    console.log("mongodb connection success ");
});

db.on('error', console.error.bind(console, 'connection error:'));
exports.mongoose = mongoose;
exports.db = db;