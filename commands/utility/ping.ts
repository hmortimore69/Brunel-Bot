import { SlashCommandBuilder, CommandInteraction } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction: CommandInteraction) {
    const websocketLatency = interaction.client.ws.ping;
    const before = await interaction.reply({
      content: "Pinging...",
      fetchReply: true,
    });
    const roundtripLatency =
      before.createdTimestamp - interaction.createdTimestamp;
    const latencyMessage =
      websocketLatency === -1
        ? "WebSocket latency is still being calculated..."
        : `WebSocket Latency: ${websocketLatency}ms`;

    await interaction.editReply({
      content: `Pong!  🏓\nRound-trip Latency: ${roundtripLatency}ms\n${latencyMessage}`,
    });
  },
};
