const fs = require('fs');

// Displays help and documentation about how to use the bot.
// Usage: !help
function run(client, message, args) {
  if (args.length == 0) {

    let modules = require("./modules.json");
    modules = Object.keys(modules);

    // Display the entire documentation
    fs.readFile(__dirname + '/documentation/dependencies/help/message.md', function (err, data) {
      if (err) throw err;
      message.channel.send(data.toString() + `\n\n${modules.map(m => `\`${m}\``).join(", ")}`).catch(console.error);  
    });
  }
  else if (args.length > 0) {
    // Display documentation for an individual command
    fs.readFile(__dirname + `/documentation/commands/${args[0]}.md`, function (err, data) {
      if (err) throw err;
      message.channel.send(data.toString()).catch(console.error);  
    });
  }

  
}

exports.run = run;
