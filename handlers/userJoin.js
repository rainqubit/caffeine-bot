// Fires when a user joins the server
function handle(client, member) {
  const config = require("../config.json");

  if (config.greeting) {
    const greetingChannel = client.utils.findChannel(member.guild, config.greeting.channel)
    const message = config.greeting.message.replace(/%user/g, member.toString()).replace(/%server/g, member.guild.name)

    greetingChannel.send(message)
  }
}

module.exports = handle;