const fs = require("fs");
const chalk = require("chalk");

module.exports = (client) => {
  try {
    const events = fs.readdirSync("./events/")
      .filter(file => file.endsWith(".js"));

    for (let file of events) {
      let pull = require(`../events/${file}`);
      if (pull.name) {
        client.events.set(pull.name, pull);
      }
    }
    console.log(chalk.gray.bold(`${events.length}  Events Loaded Successfullly`))
  } catch (e) {
    console.log(e.message);
  }
};

/**
Coded by: Real_IceyDev & Ghex
License: Attribution-NonCommercial-ShareAlike 4.0 International
Bumper Buddy
*/