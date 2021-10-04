const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  const userName = process.env.DB_USERNAME;
  const password = process.env.DB_PASSWORD;
  const dbName = 'shop';
  const dbURL = `cluster0.coqsd.mongodb.net/${dbName}`;

  MongoClient.connect(
    `mongodb+srv://${userName}:${password}@${dbURL}?retryWrites=true&w=majority`,
  )
    .then((client) => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found;';
};
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
