const colors = require('discord.js');
module.exports = {
  name: 'ready',
  once: true,
  execute: async(client) => {
    console.log(`Succesfully logged on ${client.user.username}`);
  }
}