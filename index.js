const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const fs = require('fs');
const chalk = require('chalk');
const client = new Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  failIfNotExists: false,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  shards: 'auto',
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: true,
  },
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessageReactions,
    //GatewayIntentBits.GuildIntegrations,
    //GatewayIntentBits.GuildWebhooks,
    //GatewayIntentBits.GuildInvites,
    //GatewayIntentBits.GuildPresences,
    //GatewayIntentBits.GuildMessageTyping,
    //GatewayIntentBits.DirectMessages,
  ],
});
module.exports = client;

console.log(chalk.bold.blue("Starting bot..."));

//Global Variables.
client.events = new Collection();
client.cooldowns = new Collection();
client.subcmd = new Collection();
client.commands = new Collection();
client.temp = new Map();
client.temp2 = new Map();
client.categories = fs.readdirSync("./commands/");

//Handlers.
["event_handler", "slash_handler"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

//Datastore connection.
const Enmap = require("enmap");
client.settings = new Enmap({
  name: "settings",
});

//Error logging.
process.on("unhandledRejection", (reason, p) => {
  console.log("[Error_Handling] :: Unhandled Rejection/Catch");
  console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  console.log("[Error_Handling] :: Uncaught Exception/Catch");
  console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log("[Error_Handling] :: Uncaught Exception/Catch (MONITOR)");
  console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
  console.log("[Error_Handling] :: Multiple Resolves");
  console.log(type, promise, reason);
});

//Login.
client.login(process.env.token);

//Start the server
require('./server')();

/**
Coded by: Real_IceyDev & Ghex
License: Attribution-NonCommercial-ShareAlike 4.0 International
Bumper Buddy
*/