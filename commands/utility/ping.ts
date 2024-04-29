import { SlashCommandBuilder, CommandInteraction } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction: CommandInteraction) {
        const before = Date.now();
        try {
            await interaction.deferReply();
            const after = Date.now();
            const latency = after - before;
            await interaction.followUp(`Pong! Bot latency: ${latency}ms`);
        } catch (error) {
            console.error('Error deferring reply:', error);
        }
    },
};