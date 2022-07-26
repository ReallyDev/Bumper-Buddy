const { ApplicationCommandOptionType, ChannelType, PermissionFlagsBits } = require("discord.js");
const q = require("fs");

function len(obj) {
  for (let w of ["size", "length"]) {
    if (![null, undefined].includes(e = obj[w])) {
      return e
    }
  }

  let w = 0

  for (let {} of obj) w++

  return w
}

/**
 * @type {import("discord.js").ChatInputApplicationCommandData}
 */
module.exports = {
  name: "setchannel",
  description: `Set your own bump channel.`,
  userPermissions: [PermissionFlagsBits.ManageChannels],
  botPermissions: [PermissionFlagsBits.SendMessages],
  category: "Configuration",
  cooldown: 3600,
  options: [
    {
      name: "channel",
      description: "the bump channel",
      type: ApplicationCommandOptionType.Channel,
      channelTypes: [ChannelType.GuildText],
      required: true,
    },
  ],

  async run(w, e, r, t) {
    try {
      return q.readFile("../../config/data.json", "utf8", function(err, data) {
        if (err) throw err
  
        let y = eval(data) // y is now a plain JSON object
  
        for (let u in y) {
          return y // idk
        }
      })
    } catch(err) {
      let data = `An error ocurred: ${err}`
      console.error(data + `\nArgs: ${len(r)}`)
      await e.reply(data)
    }
  }
}

/**
Coded by: Real_IceyDev & Ghex
License: Attribution-NonCommercial-ShareAlike 4.0 International
Bumper Buddy
*/