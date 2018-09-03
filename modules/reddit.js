const fs = require('fs');

// Displays information about the linked subreddit.
// Usage: !reddit
function run(_, ctx) {
  fs.readFile(__dirname + '/documentation/reddit.md', function (err, data) {
    if (err) throw err;
    ctx.sendMessage(data.toString()).catch(console.error)
  });
}

exports.run = run;