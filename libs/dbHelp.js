
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var config = require('./config');
let dbUrl = config.MongoClientConfig.dbUrl;
let dbName = config.MongoClientConfig.dbName;

exports.mongodb = mongodb;
exports.MongoClient = MongoClient;

exports.findByPaging = function (collectionName, conditionObj, skip, limit)
{
    skip = typeof skip !== "number" ? 0 : skip;
    limit = typeof limit !== "number" ? 10 : limit;

    var promise = new Promise(function (resolve, reject)
    {

        MongoClient.connect(dbUrl, function (err, client)
        {

            if (err)
            {
                client.close();
                throw err;

            } else
            {
                //  console.log("Connected correctly to server");
                client.db(dbName).collection(collectionName).find(conditionObj).skip(skip).limit(limit).toArray(function (err, data)
                {
                    if (err)
                    {
                        client.close();
                        reject(err);
                        return;
                    } else
                    {
                        resolve(data);
                        client.close();
                    }
                });

            }
        });

    });

    return promise;

}

exports.find = function (collectionName, conditionObj)
{

    var promise = new Promise(function (resolve, reject)
    {
        MongoClient.connect(dbUrl, function (err, client)
        {
            if (err)
            {
                client.close();
                throw err;

            } else
            {
                //  console.log("Connected correctly to server");
                client.db(dbName).collection(collectionName).find(conditionObj).toArray(function (err, data)
                {
                    if (err)
                    {
                        client.close();
                        reject(err);
                    }
                    else
                    {
                        resolve(data);
                        client.close();
                    }
                });
            }

        });
    });
    
    return promise;

}

exports.count = function (collectionName, conditionObj)
{

    var promise = new Promise(function (resolve, reject)
    {
        MongoClient.connect(dbUrl, function (err, client)
        {
            if (err)
            {
                throw err;

            } else
            {
                //  console.log("Connected correctly to server");
                client.db(dbName).collection(collectionName).find(conditionObj).count(function (err, data)
                {
                    if (err)
                    {
                        client.close();
                        reject(err);
                    }
                    else
                    {
                        resolve(data);
                        client.close();
                    }

                });
            }

        });
    });
    return promise;

}

exports.update = function (collectionName, conditionObj, updateObj)
{

    var promise = new Promise(function (resolve, reject)
    {
        MongoClient.connect(dbUrl, function (err, client)
        {
            if (err)
            {
                client.close();
                throw err;

            } else
            {
                //  console.log("Connected correctly to server");
                client.db(dbName).collection(collectionName).update(conditionObj, updateObj, function (err, data)
                {
                    if (err)
                    {
                        client.close();
                        reject(err);
                    }
                    resolve(data.result);
                    client.close();

                });
            }

        });
    });
    return promise;

}

exports.updateMany = function (collectionName, conditionObj, updateObj)
{

    var promise = new Promise(function (resolve, reject)
    {
        MongoClient.connect(dbUrl, function (err, client)
        {
            if (err)
            {
                client.close();
                throw err;

            } else
            {
                //  console.log("Connected correctly to server");
                client.db(dbName).collection(collectionName).update(conditionObj, updateObj, {multi: true}, function (err, data)
                {
                    if (err)
                    {
                        client.close();
                        reject(err);
                    }
                    else
                    {
                        resolve(data);
                        client.close();
                    }

                });
            }

        });
    });
    return promise;

}

exports.delete = function (collectionName, conditionObj)
{

    var promise = new Promise(function (resolve, reject)
    {
        MongoClient.connect(dbUrl, function (err, client)
        {
            if (err)
            {
                client.close();
                throw err;

            } else
            {
                //  console.log("Connected correctly to server");
                client.db(dbName).collection(collectionName).deleteOne(conditionObj, function (err, data)
                {
                    if (err)
                    {
                        client.close();
                        reject(err);
                    }
                    else
                    {
                        resolve(data);
                        client.close();
                    }

                });
            }

        });
    });
    return promise;

}

exports.deleteMany = function (collectionName, conditionObj)
{

    var promise = new Promise(function (resolve, reject)
    {
        MongoClient.connect(dbUrl, function (err, client)
        {
            if (err)
            {
                client.close();
                throw err;

            } else
            {
                //  console.log("Connected correctly to server");
                client.db(dbName).collection(collectionName).deleteMany(conditionObj, function (err, data)
                {
                    if (err)
                    {
                        client.close();
                        reject(err);
                    }
                    else
                    {
                        resolve(data);
                        client.close();
                    }

                });
            }

        });
    });
    return promise;

}

exports.insert = function (collectionName, insertObj)
{

    var promise = new Promise(function (resolve, reject)
    {
        MongoClient.connect(dbUrl, function (err, client)
        {
            if (err)
            {
                client.close();
                throw err;

            } else
            {
                //  console.log("Connected correctly to server");
                client.db(dbName).collection(collectionName).insertOne(insertObj, function (err, data)
                {
                    if (err)
                    {
                        client.close();
                        reject(err);
                    }
                    else
                    {
                        resolve(data);
                        client.close();
                    }

                });
            }

        });
    });
    return promise;

}

exports.insertMany = function (collectionName, insertObjs)
{

    var promise = new Promise(function (resolve, reject)
    {
        MongoClient.connect(dbUrl, function (err, client)
        {
            if (err)
            {
                client.close();
                throw err;

            } else
            {
                //  console.log("Connected correctly to server");
                client.db(dbName).collection(collectionName).insertMany(insertObjs, function (err, data)
                {
                    if (err)
                    {
                        client.close();
                        reject(err);
                    }
                    else
                    {
                        resolve(data);
                        client.close();
                    }

                });
            }

        });
    });
    return promise;

}



