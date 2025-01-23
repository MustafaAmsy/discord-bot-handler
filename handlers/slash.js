const fs = require('fs');
const { Routes, REST, Client } = require('discord.js');
const path = require('path');
module.exports = (client) => {
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
      }
    }
  }
  const commandsPath = path.join(__dirname, 'commands/slash/');
  loadCommands(commandsPath);
}