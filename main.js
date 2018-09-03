// Requires
const Discord = require('discord.js');
const Enmap = require('enmap');
const chalk = require('chalk');
const Utils = require('./utils.js');
let config = require('./config.json');
let client = new Discord.Client();

const emojiMap = {
  success: "\u2705", // Green box tick
  error: "\u274c", // Red cross
  setupTask: "\u231B" // Hour glass
}

function setupBot() {
  client.utils = new Utils();

  client.config = config;
  client.commands = new Enmap();

  // Perform config checks
  verifyConfig(config);

  // Hook the event handlers
  hookHandlers();

  // Load the modules
  loadModules();

  // Login to the Discord bot using the auth token
  client.login(config.token)
    .then(() => console.log(chalk.green(`${emojiMap.success} Started bot`)))
    .catch(console.error);

  client.on('ready', () => {
    if (config.activityType && config.activityText) {
      client.user.setActivity(config.activityText, {type: config.activityType});
      console.log(chalk.green(`\n${emojiMap.success} Bot activity set as '${client.utils.formattedActivity(config.activityType, config.activityText)}'`));
    }
  })
}

function verifyConfig(config) {
  if (config.activityType == "") {
    // No activity type given
    config.activityType = false;
    config.activityText = false;
  } else if (!(/listening|playing/g.test(config.activityType.toLowerCase()))) {
    // Invalid config type, exit
    console.log(chalk.red(`${emojiMap.error} Invalid activity type of '${config.activityType}'' given`));
    process.exit(1);
  }
}

function loadModules() {
  // Load the modules from the modules.json file

  const modules = require('./modules/modules.json');
  Object.keys(modules).forEach(key => {
    let name = key, file = modules[key];
    let module = require(`./modules/${file}`);
    
    console.log(`${emojiMap.setupTask} Loading module '${name}' from '${file}'`);
    client.commands.set(name, module);
  });
}

function hookHandlers() {
  // Hook the event

  const handlers = require('./handlers/handlers.json');
  Object.keys(handlers).forEach(key => {
    let handle = key, file = handlers[key];
    let event = require(`./handlers/${file}`);
    
    console.log(`${emojiMap.setupTask} Hooking handler for '${handle}' to '${file}'`);
    client.on(handle, event.bind(null, client));
  });
}

setupBot();
