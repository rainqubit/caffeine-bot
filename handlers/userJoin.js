// Fires when a user joins the server
function handle(client, member) {
  const guild = member.guild;
  let channel = member.guild.channels.find(channel => channel.name === "rules-and-info").toString();

  // Placeholder in-case I want to do something here
}

module.exports = handle;