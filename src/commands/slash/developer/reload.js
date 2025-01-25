const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('reload').setDescription('Reloads commands').
  aliases: 'r',
  dev: true,
  execute: async({ client, message }) => {
client.commands.clear();
client.slashCommands.clear();
client.subcommands.clear();
client.aliases.clear();
client.components.buttons.clear();
client.components.modals.clear();
client.components.selectmenus.clear();
client.comppnents.contextmenus.clear();
client.components.autocomplete.clear();
client.removeAllListeners();
['slash', 'commands', 'components', 'events'].forEach(handler => require(`../../../../handlers/${handler}`));
message.reply('\`\`\`\nSuccessfully Reloaded commands\`\`\`')
  }
}
