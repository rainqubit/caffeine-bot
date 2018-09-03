const fs = require('fs');

// Displays help and documentation about how to use the bot.
// Usage: !help
function run(_, ctx) {
  if (ctx.args.slice(1).length == 0) {
    // Display the entire documentation
    fs.readFile(__dirname + '/documentation/dependencies/help/message.md', function (err, data) {
      if (err) throw err;
      ctx.sendMessage(data.toString()).catch(console.error)
    });
  }
  else if (args.length > 0) {
    // Display documentation for an individual command
    fs.readFile(__dirname + `/documentation/commands/${args[0]}.md`, function (err, data) {
      if (err) throw err;
      ctx.sendMessage(data.toString()).catch(console.error)
    });
  }

  
}

exports.run = run;
