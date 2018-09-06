const fs = require('fs')

function sendRoles(config, message) {
  fs.readFile(__dirname + '/documentation/dependencies/role/message.md', function (err, data) {
    if (err) {
      client.utils(error, message.channel);
      return;
    } else {
      var rolesList = config.assignableRoles.roles
      if (config.assignableRoles.sorted) {
        rolesList = rolesList.sort()
      }
      rolesList = rolesList.join("\n")
      message.channel.send(`${data.toString()}\n\`\`\`\n${rolesList}\n\`\`\``)
    }
  })
}

function run(client, message, args) {
  const config = require('../config.json');

  if (!config.assignableRoles) {
    client.utils.error('Missing \'assignableRoles\' from config.json', message.channel);
    return;
  }

  if (config.assignableRoles.channel && config.assignableRoles.channel.length > 0) {
    if (message.channel.name != config.assignableRoles.channel) {
      const correctChannel = client.utils.findChannel(message.guild, config.assignableRoles.channel)
      correctChannel.send(`${message.author.toString()}, please use this channel to assign roles`)
      message.delete()
      return;
    }
  }

  if (args.length < 1) {
    sendRoles(config, message)
  } else {
    if (config.assignableRoles.roles.map(item => item.toLowerCase()).includes(args[0].toLowerCase())) {
      const role = client.utils.findRole(message.guild, args[0])

      if (role) {
        message.member.addRole(role, "Self assigned via role command")
        message.channel.send(`${message.member.toString()}, I've added \`${role.name}\` to your role list`)
      } else {
        message.channel.send(`**ERROR:** The role \`${args[0]}\` doesn't exist on this server, please create the role or delete from this list using \`delrole\``)
      }
    } else {
      sendRoles(config, message)
    }
  }
}

exports.run = run;