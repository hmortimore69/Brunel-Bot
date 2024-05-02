import { REST, Routes } from "discord.js";
import { config } from "dotenv";
import fs from "fs";
import path from "path";

config();

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

if (!token || !clientId || !guildId)
  throw new Error("Missing environment variables.");
const rest = new REST().setToken(token);

const foldersPath = path.join(__dirname, "commands");

function getCommands() {
  const commands: any[] = [];
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".ts"));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      if ("data" in command) {
        commands.push(command.data.toJSON());
      } else {
        console.log(`Error: ${file} does not have the correct structure`);
      }
    }
  }

  return commands;
}

async function configCommands() {
  const commands = getCommands();
  if (!clientId || !guildId) {
    throw new Error(
      "CLIENT_ID or GUILD_ID is not defined in the environment variables.",
    );
  }

  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`,
    );

    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );

    console.log(
      `Successfully reloaded ${(data as Array<any>).length} application (/) commands.`,
    );
  } catch (error) {
    console.error(error);
  }
}

async function deleteCommands() {
  if (!clientId || !guildId) {
    throw new Error(
      "CLIENT_ID or GUILD_ID is not defined in the environment variables.",
    );
  }
  console.log(`Started refreshing application (/) commands.`);

  rest
    .put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
    .then(() => console.log("Successfully deleted all guild commands."))
    .catch(console.error);
}

const command = process.argv[2];

switch (command) {
  case "deploy":
    configCommands().then((r) => console.log(r));
    break;
  case "delete":
    deleteCommands().then((r) => console.log(r));
    break;
  default:
    console.log('Invalid command. Use "deploy" or "delete".');
    break;
}
