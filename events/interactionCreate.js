const { InteractionType, ApplicationCommandOptionType } = require("discord.js");
const client = require("..");
const { cooldown, databasing } = require("../handlers/functions");

client.on("interactionCreate", async (interaction) => {
  await databasing(interaction.guild.id, interaction.member.id);
  // Slash Command Handling
  if (interaction.type == InteractionType.ApplicationCommand && interaction.isChatInputCommand()) {
    await interaction
      .deferReply()
      .catch(() => {});
    let prefix = "/";
    const cmd = client.commands.get(interaction.commandName);
    if (!cmd) return interaction.editReply("An error has occured");

    const args = [];

    for (let option of interaction.options.data) {
      if (option.type === ApplicationCommandOptionType.Subcommand) {
        if (option.name) args.push(option.name);
        
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) {
        args.push(option.value);
      }
    }

    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );
    
    // checking user perms
    if (!interaction.memberPermissions.has(cmd.userPermissions || [])) {
      return client.embed(
        interaction,
        `You Don't Have \`${cmd.userPermissions}\` Permission to Use \`${cmd.name}\` Command!!`
      );
    } else if (!interaction.guild.me.permissions.has(cmd.botPermissions || [])) {
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
      cmd.run({ client, interaction, args, prefix }).catch(err => {
        if (interaction.deferred && !interaction.replied) {
          interaction.editReply('An error occured');
        }
      });
    }
}

  // Context Menu Handling
  if (interaction.type === InteractionType.ApplicationCommand && interaction.isContextMenuCommand()) {
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