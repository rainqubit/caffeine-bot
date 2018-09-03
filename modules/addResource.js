

// Adds a resource from the given link and posts it in #resources.
// This operation is not automatically reversable, meaning a mod needs to remove.
// Usage: !addresource <link>
function run(client, { message, args }) {
  let resourceLink = args[0];
  let embed = client.utils.createEmbed(`Resource added by ${message.author.tag} :books:`, resourceLink, 
    `by ${message.author.tag}`, 0x00ff00);

  let channel = client.channels.find(c => c.name == "resources");
  channel.send({embed});
}

exports.run = run;