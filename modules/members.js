const Discord = require('discord.js');

// Returns the member count of the server.
// Usage: !members
function run(client, message, args) {
  var embed = client.utils.createEmbed(
    message.guild.name,
    `Member count: ${message.guild.memberCount}`,
    null,
    0x000000,
    message.guild.iconURL
  )
  message.channel.send({embed}).catch(console.error);
}

exports.run = run;