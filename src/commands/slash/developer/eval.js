const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { inspect } = require('util');
module.exports = {
  data: new SlashCommandBuilder().setName('eval').setDescription('Evaluated a code').addStringOption(option => option.setName('code').setDescription('The code you want to evaluate').setRequired(true)).addBooleanOption(option => option.setName('ephemeral').setDescription('Whether you want the code to be ephemeral or not').setRequired(false)).addBooleanOption(option => option.setName('awaited').setDescription('Whether you want the code to be awaited or not').setRequired(false)),
  dev: true,
  execute: async({ interaction, client }) => {
    let code = interaction.options.getString('code');
    let ephemeral = interaction.options.getBoolean('ephemeral') || false;
    const awaited = interaction.options.getBoolean('awaited') || false;
    let result, codeError;
    if(ephemeral) {
      ephemeral = MessageFlags.Ephemeral;
    } else {
      ephemeral = 0;
    }
    try {
      const evaluated = awaited? await eval(code) : eval(code);
      result = typeof evaluated !== "string" ? inspect(evaluated) : evaluated.includes(client.token) ? evaluated.replaceAll(client.token, "censored") : evaluated;
      } catch(error) {
        codeError = error;
      }
      if(codeError) {
       return await interaction.reply({ content: `\`\`\`js\n${codeError}\`\`\``, flags: ephemeral });
       } else if(result.length > 1999) {
         let responseArray = [];
         while(result.length > 0) {
           responseArray.push(result.substring(0,1900));
           result = result.substring(1900);
         }
        responseArray.forEach(response => interaction.reply({ content: `\`\`\`js\n${response}\`\`\`\``, flags: ephemeral }));
       } else {
          return await interaction.reply({ content: `\`\`\`js\n${result}\`\`\``, flags: ephemeral });
       }
  }
}
  
