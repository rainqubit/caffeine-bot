// Requires
const Discord = require('discord.js');
const Enmap = require('enmap');
const Utils = require('./utils.js');
let config = require('./config.json');
let client = new Discord.Client();

function setupBot() {
  client.utils = new Utils();

  client.config = config;
  client.commands = new Enmap();

  // Hook the event handlers
  hookHandlers();

  // Load the modules
  loadModules();

  // Login to the Discord bot using the auth token
  client.login(config.token);

  client.on('ready', () => {
    client.user.setActivity('the sound of raindrops.', {type: 'LISTENING'});  
  })
}

function loadModules() {
  // Load the modules from the modules.json file

  const modules = require('./modules/modules.json');
  Object.keys(modules).forEach(key => {
    let name = key, file = modules[key];
    let module = require(`./modules/${file}`);
    
    console.log(`Loading module '${name}' from '${file}'`);
    client.commands.set(name, module);
  });
}

function hookHandlers() {
  // Hook the event

  const handlers = require('./handlers/handlers.json');
  Object.keys(handlers).forEach(key => {
    let handle = key, file = handlers[key];
    let event = require(`./handlers/${file}`);
    
    console.log(`Hooking handler for '${handle}' to '${file}'`);
    client.on(handle, event.bind(null, client));
  });
}

setupBot();