const ee = require(`${process.cwd()}/config/embed.json`);
const { MessageEmbed } = require("discord.js");
const emoji = require(`${process.cwd()}/config/emoji.json`);
const ms = require('ms');

module.exports = {
  name: "uptime",
  description: `Get the bot's uptime!`,
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES"],
  category: "Information",
  cooldown: 10,

  run: async ({ client, interaction, args, prefix }) => {
    interaction.editReply({
      embeds: [
        new MessageEmbed()
          .setTitle('Uptime')
          .setColor(ee.color)
          .setDescription('```md\n'+ ms(client.uptime, { long: true }) +'\n```')
      ]
    });
  },
};

/**
Coded by: Real_IceyDev & Ghex
License: Attribution-NonCommercial-ShareAlike 4.0 International
Bumper Buddy
*/