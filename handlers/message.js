// Require spam detector
const spam = require("spamnya")
// Fired when a message is sent
function handle(client, message, _) {
  if (message.author.bot) 
    return;

  //initiate spam detector with 50 max logged chats
  spam.log(message, 50)
  if(spam.tooQuick(2, 1000)){
    //when someone send 2 chats in less than a second
    message.channel.send("slow down") //example
  }

  if(spam.sameMessages(3)){
    //when someone sends 3 identical messages
    message.channel.send("stop spamming") //example
  }

  if (message.content.startsWith(client.config.prefix)) {
    // The message is a command
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const label = args.shift().toLowerCase();
    const command = client.commands[label];

    if (command) command.run(client, message, args)
  }
}

module.exports = handle;