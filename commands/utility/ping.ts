import { SlashCommandBuilder, CommandInteraction } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction: CommandInteraction) {
        const before = Date.now();
        await interaction.deferReply();
        const after = Date.now();
        const latency = after - before;
        await interaction.editReply(`Pong! Bot latency: ${latency}ms`);
    },
};