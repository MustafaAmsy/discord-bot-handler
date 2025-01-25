const { SlashCommandBuilder, MessageFlags } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('reload').setDescription('Reloads commands').addBooleanOption(option => option.setName('ephemeral').setDescription('Whether you want the response to be ephemeral or not').setRequired(false)),
  dev: true,
  execute: async({ client, interaction }) => {
  let ephemeral = interaction.options.getBoolean('ephemeral') || false;
  if(ephemeral) {
   ephemeral = MessageFlags.Ephemeral;
  } else {
    ephemeral = 0;
  }
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
interaction.reply({
  content: '\`\`\`\nSuccessfully Reloaded commands\`\`\`',
  flags: ephemeral 
})
  
}
}
