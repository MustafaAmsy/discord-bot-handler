const { inspect } = require('util');
module.exports = {
  name: 'eval',
  aliases: 'r',
  dev: true,
  execute: async({ message, client, args }) => {
    let code = args.join(" ");
    const awaited = args[args.length - 1] === "--await";
    if(awaited) code = code.replace("--await", "").trim();
    let result, codeError;
    try {
      const evaluated = awaited? await eval(code) : eval(code);
      result = typeof evaluated !== "string" ? inspect(evaluated) : evaluated.includes(client.token) ? evaluated.replaceAll(client.token, "censored") : evaluated;
      } catch(error) {
        codeError = error;
      }
      if(codeError) {
       return  message.channel.send(`\`\`\`js\n${codeError}\`\`\``)
       } else if(result.length > 1999) {
         let responseArray = [];
         while(result.length > 0) {
           responseArray.push(result.substring(0,1900));
           result = result.substring(1900);
         }
        responseArray.forEach(response => message.reply(`\`\`\`js\n${response}\`\`\`\``)) 
       } else {
          return message.channel.send(`\`\`\`js\n${result}\`\`\``);
       }
  }
}