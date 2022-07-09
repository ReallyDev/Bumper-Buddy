const { MessageEmbed } = require("discord.js");
const client = require("..");
const ee = require("../config/embed.json");
const { databasing } = require('../handlers/functions')

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;
  databasing(message.guild.id,message.member.id)
  let prefix = "!"
  let mentionprefix = new RegExp(
    `^(<@!?${client.user?.id}>|${mentionprefixnew(prefix)})`
  );
  if (!mentionprefix.test(message.content)) return;
  const [, nprefix] = message.content.match(mentionprefix);
  if (nprefix.includes(client.user.id)) {
    const embed = new MessageEmbed()
    .setColor(ee.color)
    .setTitle(`${message.author.tag}`)
    .setURL("https://www.youtube.com/watch?v=xvFZjo5PgG0")
    .setDescription('To see all of my commands, use `/help`!');
    message.reply({ embeds: [embed] });
  }
  let args = message.content.slice(nprefix.length).trim().split(/ +/)
  let cmd = args.shift()?.toLowerCase()
  if(cmd === "rr"){
    process.exit()
    message.reply(`RESTARTING............`)
  }
});

function mentionprefixnew(newprefix) {
  return newprefix.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}

/**
Coded by: Real_IceyDev & Ghex
License: Attribution-NonCommercial-ShareAlike 4.0 International
Name Later
*/