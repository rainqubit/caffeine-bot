const Discord = require('discord.js');
const config = require('./config.json');

class Utils {


  noWhiteSpace(strings, ...placeholders) {
    // Build the string as normal, combining all the strings and placeholders
    let withSpace = strings.reduce((result, string, i) => (result + placeholders[i - 1] + string));
    let withoutSpace = withSpace.replace(/\s\s+/g, ' ');
    return withoutSpace;
  }

  createEmbed(title, desc, footer, color) {
    // Create an embed with a title, description, optional footer and color
    let embed = new Discord.RichEmbed()
      .setTitle(title)
      .setColor(color)

    if (desc !== null) embed.setDescription(desc)
    if (footer !== null) embed.setFooter(footer);
    return embed;
  }

  isAdmin(user) {
    // Check if the user has "Administrator" or "Moderator" role
    let hasRole = (user.roles.find(r => r.name === config.modRole || r.name === config.adminRole));
    return hasRole;
  }

}

module.exports = Utils;