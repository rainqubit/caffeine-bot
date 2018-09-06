const fs = require('fs');

// Displays information about the linked subreddit.
// Usage: !reddit
function run(client, message, _) {
  fs.readFile(__dirname + '/documentation/dependencies/reddit/message.md', function (err, data) {
    if (err) {
      client.utils.error(err, message.channel);
      return;
    }
    message.channel.send(data.toString()).catch(console.error)
  });
}

exports.run = run;