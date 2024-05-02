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
    .setColor("#00b0f4")
    .setFooter({
      text: "Example Footer",
      iconURL: "../../assets/images/gear.svg",
    })
    .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
