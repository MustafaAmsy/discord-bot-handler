const fs = require('fs');
const { Routes, REST, Client } = require('discord.js');
const path = require('path');
const { AsciiTable3 } = require('ascii-table3');
const table = new AsciiTable3().setHeading('Slash Commands', 'Load Status');
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
        if(command.subcommand) return client.subcommands.set(command.subcommand, command);
        if('data' in command && 'execute' in command) {
        client.slashCommands.set(command.data.name,command);
        commands.push(command.data.toJSON());
        table.addRow(command.data.name, '✔')
        } else {
          table.addRow(file.name, '✖')
        }
      }
    }
  }
  const commandsPath = path.join(__dirname, '../src/commands/slash');
  loadCommands(commandsPath);
  const rest = new REST({ version: 10 }).setToken(client.token)
  try {
    const data = await rest.put(Routes.applicationCommands(client.config.client_id), { body: commands });
  } catch(error) {
    console.log(error)
  }
}