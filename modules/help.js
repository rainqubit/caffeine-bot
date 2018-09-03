const fs = require('fs');

// Displays help and documentation about how to use the bot.
// Usage: !help
function run(_, { message, args }) {
  if (args.slice(1).length == 0) {
    // Display the entire documentation
    fs.readFile(__dirname + '/documentation/help.md', function (err, data) {
      if (err) throw err;
      console.log(data)
      message.channel.send(data.toString()).catch(console.error);  
    });
  }
  else if (args.length > 0) {
    // Display documentation for an individual command
    console.log(args[0])
    fs.readFile(__dirname + `/documentation/commands/${args[0]}.md`, function (err, data) {
      if (err) throw err;
      console.log(data)
      message.channel.send(data.toString()).catch(console.error);  
    });
  }

  
}

exports.run = run;