const { AsciiTable3 } = require('ascii-table3');
const fs = require('fs');
const { map } = require('../mappedEvents.js');
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
        const eventName = map[event.name.toLowerCase()] || event.name;
        if(event.rest) { 
          if(event.on) {
            client.rest.on(eventName, (...args) => event.execute(...args,client));
          } else {
            client.rest.once(eventName, (...args) => event.execute(...args, client));
          }
        } else {
          if(event.on) {
            client.on(eventName, (...args) => event.execute(...args, client));
          } else {
            client.once(eventName, (...args) => event.execute(...args, client))
          }
        }
        table.addRow(event.name, '✔')
        } else {
          table.addRow(file.name, '✖')
        }
      }
    }
  }
  const eventsPath = path.join(__dirname, 'src/events');
  loadEvents(eventsPath);