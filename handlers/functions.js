const {
  Interaction,
  Collection,
  MessageActionRow,
  MessageButton,
  ButtonInteraction,
  CommandInteraction,
  Client,
} = require("discord.js");
const ee = require("../config/embed.json");
const client = require("../index");

function cooldown(interaction, cmd) {
  if (!interaction || !cmd) return;
  let { client, member } = interaction;
  if (!client.cooldowns.has(cmd.name)) {
    client.cooldowns.set(cmd.name, new Collection());
  }
  const now = Date.now();
  const timestamps = client.cooldowns.get(cmd.name);
  const cooldownAmount = cmd.cooldown * 1000;
  if (timestamps.has(member.id)) {
    const expirationTime = timestamps.get(member.id) + cooldownAmount;
    if (now < expirationTime) {
      return (expirationTime - now) / 1000;
    } else {
      timestamps.set(member.id, now);
      setTimeout(() => timestamps.delete(member.id), cooldownAmount);
      return false;
    }
  } else {
    timestamps.set(member.id, now);
    setTimeout(() => timestamps.delete(member.id), cooldownAmount);
    return false;
  }
}

function databasing(guildid, userid) {
  if (guildid) {
    client.settings.ensure(guildid, {
      defautoplay: false,
      djroles: [],
      djonly: false,
    });
  }
}

async function swap_pages(client, interaction, embeds) {
  let currentPage = 0;
  if (embeds.length === 1) {
    return interaction.channel
      .send({ embeds: [embeds[0]] })
      .catch((e) => console.log("THIS IS TO PREVENT A CRASH"));
  } else {
    // first button disale
    let firstdisable = new MessageActionRow().addComponents([
      new MessageButton().setStyle("SECONDARY").setCustomId("0").setEmoji(`⏪`).setDisabled(true),
      new MessageButton().setStyle("PRIMARY").setCustomId("1").setEmoji(`◀️`),
      new MessageButton().setStyle("DANGER").setCustomId("2").setEmoji(`🗑`),
      new MessageButton().setStyle("PRIMARY").setCustomId("3").setEmoji(`▶️`),
      new MessageButton().setStyle("SECONDARY").setCustomId("4").setEmoji(`⏩`),
    ]);
    // all disabled
    let alldisabled = new MessageActionRow().addComponents([
      new MessageButton()
        .setStyle("SECONDARY")
        .setCustomId("0")
        .setEmoji(`⏪`)
        .setDisabled(true),
      new MessageButton()
        .setStyle("PRIMARY")
        .setCustomId("1")
        .setEmoji(`◀️`)
        .setDisabled(true),
      new MessageButton()
        .setStyle("DANGER")
        .setCustomId("2")
        .setEmoji(`🗑`)
        .setDisabled(true),
      new MessageButton()
        .setStyle("PRIMARY")
        .setCustomId("3")
        .setEmoji(`▶️`)
        .setDisabled(true),
      new MessageButton()
        .setStyle("SECONDARY")
        .setCustomId("4")
        .setEmoji(`⏩`)
        .setDisabled(true),
    ]);
    // second buttons disable
    let lastdisable = new MessageActionRow().addComponents([
      new MessageButton().setStyle("SECONDARY").setCustomId("0").setEmoji(`⏪`),
      new MessageButton().setStyle("PRIMARY").setCustomId("1").setEmoji(`◀️`),
      new MessageButton().setStyle("DANGER").setCustomId("2").setEmoji(`🗑`),
      new MessageButton().setStyle("PRIMARY").setCustomId("3").setEmoji(`▶️`),
      new MessageButton()
        .setStyle("SECONDARY")
        .setCustomId("4")
        .setEmoji(`⏩`)
        .setDisabled(true),
    ]);
    let allbuttons = new MessageActionRow().addComponents([
      new MessageButton().setStyle("SECONDARY").setCustomId("0").setEmoji(`⏪`),
      new MessageButton().setStyle("PRIMARY").setCustomId("1").setEmoji(`◀️`),
      new MessageButton().setStyle("DANGER").setCustomId("2").setEmoji(`🗑`),
      new MessageButton().setStyle("PRIMARY").setCustomId("3").setEmoji(`▶️`),
      new MessageButton().setStyle("SECONDARY").setCustomId("4").setEmoji(`⏩`),
    ]);
    console.log(embeds.length);
    //Send message with buttons
    let swapmsg = await interaction.followUp({
      embeds: [embeds[0]],
      components: [allbuttons],
    });
    //create a collector for the thinggy
    const collector = swapmsg.createMessageComponentCollector({
      time: 2000 * 60,
    });
    collector.on("collect", async (b) => {
      if (b.isButton()) {
        await b.deferUpdate().catch((e) => {});
        // page first
        if (b.customId == "0") {
          await b.deferUpdate().catch((e) => {});
          if (currentPage !== 0) {
            currentPage = 0;
            await swapmsg.edit({
              embeds: [embeds[currentPage]],
              components: [firstdisable],
            });
            await b.deferUpdate().catch((e) => {});
          }
        }
        //page forward
        if (b.customId == "1") {
          await b.deferUpdate().catch((e) => {});
          if (currentPage !== 0) {
            currentPage -= 1;
            await swapmsg.edit({
              embeds: [embeds[currentPage]],
              components: [allbuttons],
            });
            await b.deferUpdate().catch((e) => {});
          } else {
            currentPage = embeds.length - 1;
            await swapmsg.edit({
              embeds: [embeds[currentPage]],
              components: [allbuttons],
            });
            await b.deferUpdate().catch((e) => {});
          }
        }
        //go home
        else if (b.customId == "2") {
          try {
            swapmsg.edit({
              embeds: [embeds[currentPage]],
              components: [alldisabled],
            });
          } catch (e) {}
        }
        //go forward
        else if (b.customId == "3") {
          if (currentPage < embeds.length - 1) {
            currentPage++;
            await swapmsg.edit({
              embeds: [embeds[currentPage]],
              components: [allbuttons],
            });
          } else {
            currentPage = 0;
            await swapmsg.edit({
              embeds: [embeds[currentPage]],
              components: [allbuttons],
            });
          }
        }
        // page last
        if (b.customId == "4") {
          currentPage = embeds.length - 1;
          await swapmsg.edit({
            embeds: [embeds[currentPage]],
            components: [lastdisable],
          });
        }
      }
    });

    collector.on("end", () => {
      swapmsg.edit({ components: [alldisabled] });
    });
  }
}

function parseDuration(duration) {
  let remain = duration;
  let days = Math.floor(remain / (1000 * 60 * 60 * 24));
  remain = remain % (1000 * 60 * 60 * 24);

  let hours = Math.floor(remain / (1000 * 60 * 60));
  remain = remain % (1000 * 60 * 60);

  let minutes = Math.floor(remain / (1000 * 60));
  remain = remain % (1000 * 60);

  let seconds = Math.floor(remain / 1000);
  remain = remain % 1000;

  let milliseconds = remain;

  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
  };
}

function formatTime(o, useMilli = false) {
  let parts = [];
  if (o.days) {
    let ret = o.days + " Day";
    if (o.days !== 1) {
      ret += "s";
    }
    parts.push(ret);
  }
  if (o.hours) {
    let ret = o.hours + " Hr";
    if (o.hours !== 1) {
      ret += "s";
    }
    parts.push(ret);
  }
  if (o.minutes) {
    let ret = o.minutes + " Min";
    if (o.minutes !== 1) {
      ret += "s";
    }
    parts.push(ret);
  }
  if (o.seconds) {
    let ret = o.seconds + " Sec";
    if (o.seconds !== 1) {
      ret += "s";
    }
    parts.push(ret);
  }
  if (useMilli && o.milliseconds) {
    let ret = o.milliseconds + " ms";
    parts.push(ret);
  }
  if (parts.length === 0) {
    return "instantly";
  } else {
    return parts;
  }
}

function duration(duration, useMilli = false) {
  let time = parseDuration(duration);
  return formatTime(time, useMilli);
}

module.exports = {
  cooldown,
  databasing,
  swap_pages,
  parseDuration,
  formatTime,
  duration,
};

/**
Coded by: Real_IceyDev & Ghex
License: Attribution-NonCommercial-ShareAlike 4.0 International
Bumper Buddy
*/