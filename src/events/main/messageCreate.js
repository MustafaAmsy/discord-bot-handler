module.exports = {
  name: 'messageCreate',
  on: true,
  execute: async ({ message, client }) => {
  const { channel, author, guild, member } = message;
  const developers = client.config.developers;
  let isDeveloper = false;
  if(Array.isArray(developers) && developers.includes(message.author.id)) {
      isDeveloper = true;
  } else if(developers === message.author.id) {
    isDeveloper = true;
  }
  const prefix = client.config.prefix;
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(command.length === 0) return;
  const cmd = client.commands.get(command) ? client.commands.get(command) : client.commands.get(client.aliases.get(command));
  
  if(cmd) {
    try {
     if(cmd.dev && isDeveloper) return;
     await cmd.execute({ message, client, args, author, guild, member, channel });
  } catch (error) {
    console.log(error)
  }
  
  }
}
}