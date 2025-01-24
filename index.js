const { Client, Collection, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');
const client = new Client({
  intents:
  [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildPresences,
  GatewayIntentBits.GuildInvites
    ]
});
client.config = config;
client.commands = new Collection();
client.slashCommands = new Collection();
client.aliases = new Collection();
client.components = { 
  buttons: new Collection(), 
  modals: new Collection(), 
  selectMenus: new Collection() 
};
client.login(client.config.token);