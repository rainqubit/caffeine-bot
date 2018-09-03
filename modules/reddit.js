const fs = require('fs');

// Displays information about the linked subreddit.
// Usage: !reddit
function run(_, { message, args }) {
  fs.readFile(__dirname + '/documentation/reddit.md', function (err, data) {
    if (err) throw err;
    message.channel.send(data.toString()).catch(console.error);
  });
}

exports.run = run;