// Fired when a message is sent
function handle(client, message, args) {
  if (message.author.bot) 
    return;

  if (message.content.startsWith(client.config.prefix)) {
    // The message is a command
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const label = args.shift().toLowerCase();
  
    const cmd = client.commands.get(label);
    if (!cmd) return;
    cmd.run(client, message, args);
  }
  else {
    // The message is a regular message
  }
}

module.exports = handle;