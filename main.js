// Requires
const Discord = require('discord.js');
const Enmap = require('enmap');
const Utils = require('./utils.js');
const fs = require('fs');

let config = require('./config.json');
let client = new Discord.Client();

function setupBot() {
  client.utils = new Utils ();

  client.config = config;
  client.commands = new Enmap();

  // Perform config checks
  verifyConfig(config);

  // Hook the event handlers
  hookHandlers();

  // Load the modules
  loadModules();

  // Login to the Discord bot using the auth token
  client.login(config.token);

  client.on('ready', () => {
    if (config.activityType && config.activityText) {
      console.log(`Starting bot with activity '${client.utils.formattedActivity(config.activityType, config.activityText)}'`)
      client.user.setActivity(config.activityText, {type: config.activityType});
    } else {
      console.log("Starting bot")
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
    console.log(`ERROR: Invalid activity type of '${config.activityType}'' given`);
    process.exit(1);
  }
}

function loadModules() {
  // Load the modules from the modules.json file

  let modules = require('./modules/modules.json');
  Object.keys(modules).forEach(key => {
    let name = key, file = modules[key];
    let module = require(`./modules/${file}`);
    
    console.log(`Loading module '${name}' from '${file}'`);
    client.commands.set(name, module);
  });
}

function hookHandlers() {
  // Hook the event

  let handlers = require('./handlers/handlers.json');
  Object.keys(handlers).forEach(key => {
    let handle = key, file = handlers[key];
    let event = require(`./handlers/${file}`);
    
    console.log(`Hooking handler for '${handle}' to '${file}'`);
    client.on(handle, event.bind(null, client));
  });
}

setupBot();