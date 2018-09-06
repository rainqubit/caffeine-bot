// Adds a resource from the given link and posts it in #resources.
// This operation is not automatically reversable, meaning a mod needs to remove.
// Usage: !addresource <link>
function run(client, message, args) {
  let resourceLink = args[0];
  let embed = client.utils.createEmbed(`Resource added by ${message.author.tag} :books:`, resourceLink, 
    `by ${message.author.tag}`, 0x00ff00);

  const resourcesChannel = client.utils.findChannel(message.guild, "resources");

  if (resourcesChannel === null) return message.channel.send("**ERROR:** No resources channel found, please add one or disable in bot configuration").catch(console.error)
  message.channel.send(`${message.author.toString()}, resource added to ${resourcesChannel.toString()}`)
  resourcesChannel.send({embed});
}

exports.run = run;