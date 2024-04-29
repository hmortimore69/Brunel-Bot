import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';

config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, readyClient => {
    console.log(`Logged in as ${readyClient.user?.tag}`);
})



client.login(process.env.DISCORD_TOKEN);