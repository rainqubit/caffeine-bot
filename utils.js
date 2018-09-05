const Discord = require('discord.js');
const config = require('./config.json');

class Utils {


  noWhiteSpace(strings, ...placeholders) {
    // Build the string as normal, combining all the strings and placeholders
    let withSpace = strings.reduce((result, string, i) => (result + placeholders[i - 1] + string));
    let withoutSpace = withSpace.replace(/\s\s+/g, ' ');
    return withoutSpace;
  }

  createEmbed(title, desc, footer, color, thumbnail = null) {
    // Create an embed with a title, description, optional footer and color
    let embed = new Discord.RichEmbed()
      .setTitle(title)
      .setColor(color)

    if (desc != null) embed.setDescription(desc);
    if (footer != null) embed.setFooter(footer);
    if (thumbnail != null) embed.setThumbnail(thumbnail);
    return embed;
  }

  isAdmin(user) {
    // Check if the user has "Administrator" or "Moderator" role
    let hasRole = (user.roles.find(r => r.name === config.modRole || r.name === config.adminRole));
    return hasRole;
  }

  formattedActivity(activityType, activityText) {
    // Generate a human readable activity
    activityType = activityType.toLowerCase();
    if (activityType == "listening") {
      return "Listening to " + activityText
    } else {
      activityType = activityType.charAt(0).toUpperCase() + activityType.substr(1);
      return `${activityType} + ${activityText}`
    }
  }

  error(error, channel) {
    console.log(`ERROR: ${chalk.red(error)}`)
    channel.send(`An error has occured, please contact an admin and prompt them to read the console.`)
  }

  findChannel(guild, name) {
    return guild.channels.find(c => c.name == name)
  }

  findRole(guild, name, caseSensitive = false) {
    if (!caseSensitive) {
      name = name.toLowerCase()
    }

    var role = guild.roles.find(item => {
      if (!caseSensitive) item.name = item.name.toLowerCase()
      return item.name == name
    })

    return role
  }

  saveNewConfig(config) {
    return new Promise((resolve, reject) => {
      config = JSON.stringify(config, null, 2);
      fs.writeFile(__dirname + "/config.json", config, (err) => {
        if (err) reject(err)
        else resolve()
      })
    })
  }

}

module.exports = Utils;