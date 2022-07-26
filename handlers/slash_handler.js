const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const chalk = require("chalk");
const ee = require("../config/embed.json");

module.exports = async (client) => {
  console.log(chalk.bold.green("SLASH COMMANDS━━━━━━━━━━━━━━━━━━━┓"));
  let cmdName;
  let cmdOption;

  let commands = [];
  fs.readdirSync("./commands").forEach(file => {
    if (!fs.lstatSync(`./commands/${file}`).isDirectory()) {
      if (file.endsWith('.js')) commands.push(file);
      return;
    }

    const subFolder = fs.readdirSync(`./commands/${file}`)
      .filter(f => f.endsWith('.js'))
      .map(f => `${file}/${f}`);

    commands.push(...subFolder);
  });

  for (cmd of commands) {
    try {
      const loc = process.cwd() + `/commands/${cmd}`;
      if (!fs.existsSync(loc)) throw new Error('Command not found:' + path);
      
      let pull = require(loc);
      if (pull.options) {
        pull.options
          .filter((g) => g.type === "SUB_COMMAND")
          .forEach((sub) => {
            client.subcmd.set(sub.name, sub);
          });
      }
      if (pull.name) {
        client.commands.set(pull.name, pull);
        cmdName = pull.name;
        cmdOption = "✅";
      } else {
        continue;
      }
      console.log(
        `${chalk.bold.green("┃")} Loaded: ${cmdOption} ${chalk.bold.green(
          "┃"
        )} ${cmdName}`
      );
    } catch (e) {
      console.log(e);
    }
  }
  console.log(chalk.bold.green("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛"));

  console.log(` Loaded ${client.commands.size} commands `);

  client.embed = (interaction, data) => {
    return interaction.followUp({
      embeds: [
        new EmbedBuilder()
          .setColor(ee.color)
          .setTitle(data.substr(0, 2000))
          .setFooter({
            text: ee.footertext,
            iconURL: ee.footericon,
          }),
      ],
    });
  };
};

/**
Coded by: Real_IceyDev & Ghex
License: Attribution-NonCommercial-ShareAlike 4.0 International
Bumper Buddy
*/