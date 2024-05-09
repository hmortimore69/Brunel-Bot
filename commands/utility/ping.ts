import { SlashCommandBuilder, CommandInteraction, EmbedBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction: CommandInteraction) {
    const websocketLatency = interaction.client.ws.ping;
    const latencyMessage =
      websocketLatency === -1
        ? "WebSocket Latency: N/A"
        : `WebSocket Latency: ${websocketLatency}ms`;

    const responseEmbed = new EmbedBuilder()
      .setTitle("Pinging...")
      .setColor("#0099ff")
      .addFields({
        name: "Round-trip Latency",
        value: "Calculating...",
        inline: true
      },
      {
        name: "WebSocket Latency",
        value: "Calculating...",
        inline: true
      })
      .setTimestamp();

    const sentEmbed = await interaction.reply({ embeds: [responseEmbed], fetchReply: true });

    const roundtripLatency = sentEmbed.createdTimestamp - interaction.createdTimestamp;

    const updatedEmbed = new EmbedBuilder()
      .setTitle("Pong! 🏓")
      .setColor("#0099ff")
      .addFields({
        name: "Round-trip Latency",
        value: `${roundtripLatency}ms`,
        inline: true
      },
      {
        name: "WebSocket Latency",
        value: latencyMessage,
        inline: true
      })
      .setTimestamp();
    await interaction.editReply({ embeds: [updatedEmbed] });
  },
};