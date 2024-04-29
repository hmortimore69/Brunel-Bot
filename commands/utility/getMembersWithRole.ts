import {
    Collection,
    CommandInteraction,
    Guild,
    GuildMember,
    Role,
    SlashCommandBuilder,
    Snowflake
} from 'discord.js';

async function getMembersWithRole(guild: Guild, roleResolvable: Role | null | undefined): Promise<Collection<Snowflake, GuildMember>> {
    // Fetch all members of the guild with force option
    // @ts-ignore
    const members = await guild.members.fetch({ force: true });

    // Check if roleResolvable is not null or undefined
    if (!roleResolvable) {
        throw new Error('Role not found');
    }

    // Filter the members to only include those with the specific role
    return members.filter(member => member.roles.cache.has(guild.roles.resolveId(roleResolvable)));
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roleusers')
        .setDescription('Replies with a list of users with a specific role')
        .addRoleOption(option =>
            option.setName('role')
            .setDescription('The role to check')
            .setRequired(true)),
    async execute(interaction: CommandInteraction) {
        if (!interaction.guild) {
            return interaction.reply({ content: 'This command can only be used in a guild.', ephemeral: true });
        }
        const role = interaction.options.get('role', true).role; // Get the 'role' option
        if (!role || !(role instanceof Role)) {
            return interaction.reply({ content: 'Role not found', ephemeral: true });
        }
        const membersWithRole = await getMembersWithRole(interaction.guild, role);
        if (!membersWithRole.size) {
            return interaction.reply({ content: `No users with the ${role.name} role found.`, ephemeral: true });
        }
        const memberNames = membersWithRole.map(member => member.user.username).join(', ');
        await interaction.reply(`Users with the ${role.name} role: ${memberNames}`);
    }
};