const { Client } = require('discord.js');
module.exports = {
  name: 'messageCreate',
  on: true,
  execute: async ({ message, client }) => {
  const prefix = client.config.prefix;
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;
  
  
  }
}