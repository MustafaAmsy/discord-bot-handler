const { Client, Collection, GatewayIntentBits } = require('discord.js');
const config = require('./configuration.json')
const client = new Client({
  intents:
  [
  GatewayIntentBits.Guilds  
    ]
});
client.login(config.client.token)