const { Client, Routes, REST } = require('discord.js');
const fs = require('fs');
const { AsciiTable3 } = require('ascii-table3');
const table = new AsciiTable3().setHeading('Slash Commands', 'Load Status')
module.exports =  async(client) => { 
  const commands = [];
  fs.readdirSync('./Commands/Slash/').forEach(folder => { })
}