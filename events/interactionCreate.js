const { MessageEmbed } = require("discord.js");
const client = require("..");
const { cooldown, databasing } = require("../handlers/functions")
var ee = require("../config/embed.json");

client.on("interactionCreate", async (interaction) => {
  await databasing(interaction.guild.id, interaction.member.id);
  // Slash Command Handling
  if (interaction.isCommand()) {
    await interaction
      .deferReply() // I removed redundant { ephemeral: false }
      .catch((e) => {});
    let prefix = "/";
    const cmd = client.commands.get(interaction.commandName);
    if (!cmd) return interaction.followUp({ content: "An error has occured " });

    const args = [];

    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );
    if (cmd) {
      // checking user perms
      if (!interaction.member.permissions.has(cmd.userPermissions || [])) {
        return client.embed(
          interaction,
          `You Don't Have \`${cmd.userPermissions}\` Permission to Use \`${cmd.name}\` Command!!`
        );
      } else if (
        !interaction.guild.me.permissions.has(cmd.botPermissions || [])
      ) {
        return client.embed(
          interaction,
          `I Don't Have \`${cmd.botPermissions}\` Permission to Use \`${cmd.name}\` Command!!`
        );
      } else if (cooldown(interaction, cmd)) {
        return client.embed(
          interaction,
          ` You are On Cooldown , wait \`${cooldown(
            interaction,
            cmd
          ).toFixed()}\` Seconds`
        );
      } else {
        cmd.run({ client, interaction, args, prefix });
      }
    }
  }

  // Context Menu Handling
  if (interaction.isContextMenu()) {
    await interaction.deferReply();
    const command = client.commands.get(interaction.commandName);
    if (command) command.run(client, interaction);
  }
});

/**
Coded by: Real_IceyDev & Ghex
License: Attribution-NonCommercial-ShareAlike 4.0 International
Bumper Buddy
*/