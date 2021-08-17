
exports.mainConfig = {
    // url: "mongodb://localhost:27017,localhost:27018/admin?replicaSet=rs"   // 副本集
    url: "mongodb://localhost:27017/admin",
};

exports.MongoClientConfig = {
    dbUrl: "mongodb://localhost:27017",
    dbName: "admin"
};
