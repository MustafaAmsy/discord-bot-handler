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
        switch (component.type) {
          case "button":
            client.components.buttons.set(component.name, component);
          break;
          case "modal": 
            client.components.modals.set(component.name, component);
          break;
        }
      }
      }
    }
  const componentPath = path.join(__dirname, 'src/components');
  loadComponents(componentPath);
}