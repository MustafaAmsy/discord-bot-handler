const { AsciiTable3 } = require('ascii-table3');
const fs = require('fs');
const table = new AsciiTable3().setHeading('Events', 'Load Status');
module.exports = async(client) => {
  function loadEvents(directory) {
    const files = fs.readdirSync(directory, { withFileTypes: true });
    for (const file of files) {
      const fullPath = path.join(directory,file.name);
      if(file.isDirectory()) {
        loadEvents(fullPath)
      } else if(file.isFile() && file.name.endsWith('js')) {
        const event = require(fullPath);
        if(event.rest) { 
          if(event.on) {
            client.rest.on(event.name, (...args) => event.execute(...args,client));
          } else {
            client.rest.once(event.name, (...args) => event.execute(...args, client));
          }
        } else {
          if(event.on) {
            client.on(event.name, (...args) => event.execute(...args, client));
          } else {
            client.once(event.name, (...args) => event.execute(...args, client))
          }
        }
        table.addRow(event.name, '✔')
        } else {
          table.addRow(file.name, '✖')
        }
      }
    }
  }
  const eventsPath = path.join(__dirname, 'events');
  loadEvents(eventsPath);