const { AsciiTable3 } = require('ascii-table3');
const table = new AsciiTable3().setHeading('Events', 'Load Status');
module.exports = async(client) => {
  function loadEvents(directory) {
    const files = fs.readdirSync(directory, { withFileTypes: true });
    for (const file of files) {
      const fullPath = path.join(directory,file.name);
      if(file.isDirectory()) {
        loadEvents(fullPath)
      } else if(file.isFile() && file.name.endsWith('js')) {
        const command = require(fullPath);
        if('data' in command && 'execute' in command) {
        client.slashCommands.set(command.data.name,command);
        table.addRow(command.data.name, '✔')
        } else {
          table.addRow(file.name, '✖')
        }
      }
    }
  }
  const commandsPath = path.join(__dirname, 'commands/slash/');
  loadCommands(commandsPath);