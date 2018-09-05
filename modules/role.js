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

  if (args.length < 1) {
    sendRoles(config, message)
  } else {
    if (config.assignableRoles.roles.map(item => item.toLowerCase()).includes(args[0].toLowerCase())) {
      const roles = message.guild.roles.filter(item => item.name.toLowerCase() == args[0].toLowerCase())
      if (Array.from(roles).length == 0) {
        message.channel.send(`**ERROR:** The role \`${args[0]}\` doesn't exist on this server, please create the role or delete from this list using \`delrole\``)
      } else {
        const role = roles.values().next().value
        message.member.addRole(role, "Self assigned")
        message.channel.send(`${message.member.toString()}, I've added \`${role.name}\` to your role list`)
      }
    } else {
      sendRoles(config, message)
    }
  }
}

exports.run = run;