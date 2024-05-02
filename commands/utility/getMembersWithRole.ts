import {
  Collection,
  CommandInteraction,
  Guild,
  GuildMember,
  Role,
  SlashCommandBuilder,
  Snowflake,
} from "discord.js";

async function getMembersWithRole(
  guild: Guild,
  roleResolvable: Role | null | undefined,
): Promise<Collection<Snowflake, GuildMember>> {
  // Fetch all members of the guild with force option
  // @ts-ignore
  const members = await guild.members.fetch({ force: true });

  // Check if roleResolvable is not null or undefined
  if (!roleResolvable) {
    throw new Error("Role not found");
  }

  // Filter the members to only include those with the specific role
  return members.filter((member) =>
    member.roles.cache.has(guild.roles.resolveId(roleResolvable)),
  );
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roleusers")
    .setDescription("Replies with a list of users with a specific role")
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("The role to check")
        .setRequired(true),
    ),
  async execute(interaction: CommandInteraction) {
    let response = "";
    if (!interaction.guild) {
      response = "This command can only be used in a guild.";
    } else {
      const role = interaction.options.get("role", true).role; // Get the 'role' option
      if (!role || !(role instanceof Role)) {
        response = "Role not found";
      } else {
        const membersWithRole = await getMembersWithRole(
          interaction.guild,
          role,
        );
        if (!membersWithRole.size) {
          response = `No users with the ${role.name} role found.`;
        } else {
          const memberNames = membersWithRole
            .map((member) => member.user.username)
            .join(", ");
          response = `Users with the ${role} role: ${memberNames}`;
        }
      }
    }
    await interaction.reply({ content: response });
  },
};
