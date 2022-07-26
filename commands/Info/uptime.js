const ee = require(`${process.cwd()}/config/embed.json`);
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const ms = require('ms');

module.exports = {
  name: "uptime",
  description: `Get the bot's uptime!`,
  userPermissions: [PermissionFlagsBits.SendMessages],
  botPermissions: [PermissionFlagsBits.SendMessages],
  category: "Information",
  cooldown: 10,

  run: async ({ client, interaction, args, prefix }) => {
    interaction.editReply({
      embeds: [
        new EmbedBuilder()
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