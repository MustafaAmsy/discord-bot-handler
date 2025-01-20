const { Client, Collection, GatewayIntentBits } = require('discord.js');
const config = require('./configuration.json');
const client = new Client({
  intents:
  [
  GatewayIntentBits.Guilds  
    ]
});
client.commands = new Collection();
client.slashCommands = new Collection();
client.events = new Collection();
client.login(client.config.token);