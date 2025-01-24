const { Client, InteractionType } = require('discord.js');
module.exports = {
  name: 'interactionCreate',
  on: true,
  execute: async({ interaction, client }) => {
    switch(interaction.type) {
      case InteractionType.ApplicationCommand:
        
    }
  }
}