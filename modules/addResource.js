// Adds a resource from the given link and posts it in #resources.
// This operation is not automatically reversable, meaning a mod needs to remove.
// Usage: !addresource <link>
function run(client, ctx) {
  let resourceLink = ctx.args[1];
  let embed = client.utils.createEmbed(`Resource added by ${ctx.message.author.tag} :books:`, resourceLink, 
    `by ${ctx.message.author.tag}`, 0x00ff00);

  const channel = client.channels.find(c => c.name == "resources");
  if(channel === null) return ctx.sendMessage("Please add a resources channel").catch(console.error)
  channel.send({embed});
}

exports.run = run;