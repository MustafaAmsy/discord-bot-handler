const fs = require('fs');
const path = require('path');
module.exports = async(client) => {
  function loadComponents(directory) {
    const files = fs.readdirSync(directory, { withFileTypes: true });
    for (const file of files) {
      const fullPath = path.join(directory,file.name);
      if(file.isDirectory()) {
        loadComponents(fullPath)
      } else if(file.isFile() && file.name.endsWith('js')) {
        const component = require(fullPath);
        if(!component.type) return console.error('Missing component type');
        if(command.name) {
        client.commands.set(command.name,command);
        }
        if(command.aliases && !Array.isArray(command.aliases)) {
         client.aliases.set(command.aliases, command);
        } else if(command.aliases && Array.isArray(command.aliases)) {
        command.aliases.forEach(alias => client.aliases.set(alias, command));
        }
      }
    }
  }
  const commandsPath = path.join(__dirname, 'commands/message/');
  loadCommands(commandsPath);
}