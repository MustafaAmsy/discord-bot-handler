const { Events } = require('discord.js')
const map = { 
  autoaoderationactionaxecution: Events.AutoModerationActionExecution, 
  ready: Events.ClientReady,
  messagecreate: Events.MessageCreate,
  interactioncreate: Events.InteractionCreate
};
  module.exports = { map };