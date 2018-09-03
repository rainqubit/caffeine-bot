const DiscordContext = require('discord-context')

// Fired when a message is sent
function handle(client, message, _) {
  const context = new DiscordContext(message)
  if (message.author.bot) 
    return;

  if (message.content.startsWith(client.config.prefix)) {
    // The message is a command
    const cmd = client.commands.get(context.command);
    if (!cmd) return;
    cmd.run(client, context);
  }
}

module.exports = handle;