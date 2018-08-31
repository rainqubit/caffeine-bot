const Discord = require('discord.js');
const _ = require('lodash');
const fs = require('fs');

// Displays information about the linked subreddit.
// Usage: !reddit
function run(client, message, args) {
  fs.readFile(__dirname + '/documentation/dependencies/reddit/message.md', function (err, data) {
    if (err) throw err;

    message.channel.send(data.toString()).catch(console.error);
  });
}

exports.run = run;