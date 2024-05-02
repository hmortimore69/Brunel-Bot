import fs from "fs";
import path from "path";
import {
  Client,
  Events,
  GatewayIntentBits,
  Collection,
  ClientOptions,
} from "discord.js";
import { config } from "dotenv";

config();

class BotClient extends Client {
  commands: Collection<string, any>;

  constructor(
    options: ClientOptions = {
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
    },
  ) {
    super(options);
    this.commands = new Collection();
  }
}

const client = new BotClient();
client.commands = new Collection();

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".ts"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`Error: ${file} does not have the correct structure`);
    }
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = (interaction.client as BotClient).commands.get(
    interaction.commandName,
  );

  if (!command) {
    console.error("Command not found");
    return;
  }

  try {
    if (interaction.replied || !interaction.deferred) {
      await command.execute(interaction);
    } else {
      console.log("Interaction has already been acknowledged");
    }
  } catch (error) {
    console.error(error);
  }
});

client
  .login(process.env.DISCORD_TOKEN)
  .then(() => console.log(`Logged in as ${client.user?.tag}!`))
  .catch(console.error);
