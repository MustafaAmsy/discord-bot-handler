const { MongoClient } = require('mongodb');
const colors = require('colors');
module.exports = async(client) => {
  const databaseClient = new MongoClient(client.config.database.uri);
  databaseClient.connect().then(() => console.log(colors.cyan('Succesfully connected to the database')));
  const database = databaseClient.db('main');
  const global = database.collection('global');
  const guild = database.collection('guild');
  const channel = database.collection('channel');
  const user = database.collection('user');
  const member = database.collection('member');
  const message = database.collection('message');
  const command = database.collection('command');
  client.db = { global, guild, channel, user, member, message, command, database };
}