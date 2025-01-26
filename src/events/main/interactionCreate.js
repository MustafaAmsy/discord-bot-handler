const { InteractionType, MessageFlags } = require('discord.js');
module.exports = {
  name: 'interactionCreate',
  on: true,
  execute: async(interaction, client) => {
   const developers = client.config.developers;
   let isDeveloper = false;
   if(!Array.isArray(developers) && interaction.user.id === developers) {
     isDeveloper = true;
   } else if(Array.isArray(developers) && developers.includes(interaction.user.id)) {
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
   } else if(interaction.isButton()) {
     const button = client.components.buttons.get(interaction.customId);
     if(!button) return;
     if(button.dev && !isDeveloper) return await interaction.reply({ content: 'This is a developer button only', flags: MessageFlags.Ephemeral});
     try {
       await button.execute({ client, interaction });
     } catch(error) {
       console.log(error);
       await interaction.reply({ content: 'Something has went wrong', flags: MessageFlags.Ephemeral });
     }
   } else if(interaction.isModalSubmit()) {
     const modal = client.components.modals.get(interaction.customId);
     if(!modal) return;
     if(modal.dev && !isDeveloper) return await interaction.reply({ content: 'This is a developer modal only', flags: MessageFlags.Ephemeral});
     try {
       await modal.execute({ client, interaction });
     } catch(error) {
       console.log(error);
       await interaction.reply({ content: 'Something has went wrong', flags: MessageFlags.Ephemeral });
     }
   } else if(interaction.isContextMenuCommand()) {
     const contextMenu = client.components.contextmenus.get(interaction.customId);
          loadSubcommand(interaction, client);
     if(!contextMenu) return;
     if(contextMenu.dev && !isDeveloper) return await interaction.reply({ content: 'This is a developer context menu only', flags: MessageFlags.Ephemeral});
     try {
       await contextMenu.execute({ client, interaction });
     } catch(error) {
       console.log(error);
       await interaction.reply({ content: 'Something has went wrong', flags: MessageFlags.Ephemeral });
     }
   } else if(interaction.isAutoComplete()) {
     const autocomplete = client.components.autocomplete.get(interaction.customId);
     loadSubcommand(interaction, client);
     if(!autocomplete) return;
     if(autocomplete.dev && !isDeveloper) return await interaction.reply({ content: 'This is a developer command only', flags: MessageFlags.Ephemeral});
     try {
       await autocomplete.execute({ interaction, client });
     } catch(error) {
       console.log(error);
       await interaction.reply({ content: 'Something has went wrong', flags: MessageFlags.Ephemeral });
     }
   } else if(interaction.isAnySelectMenu()) {
     const selectMenu = client.components.selectmenus.get(interaction.customId);
     if(!selectMenu) return;
     if(selectMenu.dev && !isDeveloper) return await interaction.reply({ content: 'This is a developer select menu only!', flags: MessageFlags.Ephemeral});
     try {
      await selectMenu.execute({ interaction, client });
     } catch(error) {
      console.log(error);
       await interaction.reply({ content: 'Something has went wrong', flags: MessageFlags.Ephemeral });
     }
   }
  }
}
async function loadSubcommand(interaction, client) {
  const subcommand = client.subcommands.get(`${interaction.commandName}.${interaction.customId}`);
  if(!subcommand) return;
   const developers = client.config.developers;
   let isDeveloper = false;
   if(!Array.isArray(developers) && interaction.user.id === developers) {
     isDeveloper = true;
   } else if(Array.isArray(developers) && developers.includes(interaction.user.id)) {
     isDeveloper = true;
   }
   if(subcommand.dev && !isDeveloper) return await interaction.reply({ content: 'This is a developer command only', flags: MessageFlags.Ephemeral});
   try { 
     await subcommand.execute({ interaction, client });
   } catch(error) {
     console.log(error);
     await interaction.reply({ content: 'Something has went wrong', flags: MessageFlags.Ephemeral });
   }
}