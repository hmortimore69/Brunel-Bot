import {
  SlashCommandBuilder,
  CommandInteraction,
  EmbedBuilder,
} from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("settings")
    .setDescription("Shows the settings for the bot"),
  async execute(interaction: CommandInteraction) {
    const embed = new EmbedBuilder()
      .setTitle("Settings")
      .setThumbnail("https://raw.githubusercontent.com/hmortimore69/Brunel-Bot/main/assets/images/gear.png", )
      .setColor("#00b0f4")
      .setFooter({
        text: "Designed by Harveyyyy",
      })
    .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
