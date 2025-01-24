const { Client, InteractionType, MessageFlags } = require('discord.js');
module.exports = {
  name: 'interactionCreate',
  on: true,
  execute: async({ interaction, client }) => {
   const developers = client.config.developers;
   let isDeveloper = false;
   if(!Array.isArray(developers) && interaction.author.id === developers) {
     isDeveloper = true;
   } else if(Array.isArray(developers) && developers.includes(interaction.author.id)) {
     isDeveloper = true;
   }
   if(interaction.isChatInputCommand()) {
     const command = client.slashCommands.get(interaction.commandName);
     if(!command) return;
     if(command.dev && !isDeveloper) return await interaction.reply({ content: 'This is a developer command only', flags: MessageFlags.Ephemeral});
     try { 
     await command.execute({ interaction, client });
   } catch(error) {
     console.log(error);
     await interaction.reply({ content: 'Something has went wrong', flags: MessageFlags.Ephemeral });
   }
   }
  }
}