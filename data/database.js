const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database; // helper var that holds db once its ready

async function initDb() {
  const client = await MongoClient.connect("mongodb://0.0.0.0:27017");
  database = client.db("second-api"); // calling db on client and then naming the database second-api
}

function getDb() {
  if (!database) {
    // in case db hasnt been connected
    throw new Error("Database not connected!");
  }

  return database;
}

module.exports = {
  initDb: initDb,
  getDb: getDb,
};
