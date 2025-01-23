const fs = require('fs');
const { Routes, REST, Client } = require('discord.js');
const { AsciiTable3 } = require('ascii-table3')
const path = require('path');
module.exports = async(client) => {
  const commands = [];
  function loadCommands(directory) {
    const files = fs.readdirSync(directory, { withFileTypes: true });
    for (const file of files) {
      const fullPath = path.join(directory,file.name);
      if(file.isDirectory()) {
        loadCommands(fullPath)
      } else if(file.isFile() && file.name.endsWith('js')) {
        const command = require(fullPath);
        client.slashCommands.set(command.data.name,command);
        commands.push(command.data.toJSON());
      }
    }
  }
  const commandsPath = path.join(__dirname, 'commands/slash/');
  loadCommands(commandsPath);
  const rest = new REST({ version: 10 }).setToken(client.token)
  try {
    const data = await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
  } catch(error) {
    console.log(error)
  }
}