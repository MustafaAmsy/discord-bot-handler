const { MongoClient } = require('mongodb');
const colors = require('colors');
module.exports = async(client) => {
  const databaseClient = new MongoClient(client.config.database.uri);
  databaseClient.connect().then(() => console.log(colors.cyan('Succesfully connected to the database')));
  const database = databaseClient.db('main');
}