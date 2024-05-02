import { CommandInteraction, SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Replies with server info!"),
  async execute(interaction: CommandInteraction) {
    if (interaction.guild) {
      await interaction.reply(
        `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`,
      );
    } else {
      await interaction.reply("Unable to retrieve server info.");
    }
  },
};
