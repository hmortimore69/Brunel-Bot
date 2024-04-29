import { SlashCommandBuilder, CommandInteraction } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction: CommandInteraction) {
        const before = Date.now();
        try {
            await interaction.reply('Pinging...');
            const after = Date.now();
            const latency = after - before;
            await interaction.editReply(`Pong! Bot latency: ${latency}ms`);
        } catch (error) {
            console.error('Error replying:', error);
        }
    },
};